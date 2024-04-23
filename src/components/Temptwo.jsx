'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import TopGenresChart from './TopGenresChart';
import ArtistPopularityChart from './ArtistPopularityChart';
import TopSongsAnalysis from './TopSongsAnalysis';
import TopAlbums from './TopAlbums';
import { db } from '@/lib/firebase';
import { addDoc, collection,getDocs,orderBy,query,where} from 'firebase/firestore';


const TopSongsAndArtists = ({timeFrame, session}) => {

  const [dbData, setDbData] = useState([])

  const artistCollectionRef = collection(db, "ArtistRankings")
  
  // Top Artists API call, sets timeFrame from TimeNavBar
    const {
      data: myTopArtistData,
      status,
      refetch,
    } = useQuery({
      queryKey: ["myTopArtistQuery"],
      enabled: !!session,
      queryFn: () => {
        return axios.get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          params: {
            limit: 40,
            time_range: timeFrame
          },
        });
      },
    });
    // Top Songs API call, sets timeFrame from TimeNavBar
    const {
      data: myTopSongsData,
      refetch: ts,
      error,
    } = useQuery({
      queryKey: ["myTopSongsQuery"],
      enabled: !!session,
      queryFn: () => {
        return axios.get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          params: {
            limit: 40,
            time_range: timeFrame
          },
        });
      },
    });
    // Get song attributes for top songs
    
    const {
      data:myTopSongsAttributeData,
      refetch: tsa,
      error:atterror
    } = useQuery({
      queryKey:["myTopSongsAttributeQuery",myTopSongsData],
      enabled:!!session,
      queryFn:() => {
        const topTrackIds = myTopSongsData?.data.items.map((topTrack) => topTrack.id);
        const topTrackIdsString = topTrackIds?.join(",");
        // console.log("SongAttributes", topTrackIds)
        return axios.get(`https://api.spotify.com/v1/audio-features`, {
        params: {
          ids: topTrackIdsString,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        }
      })   
 }  
})
// gets the users profile details
const {data:profile} = useQuery({
  queryKey:["profile"],
  enabled:!!session,
  refetchOnWindowFocus: false,    
  queryFn:() => {
    return axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`
      }
    })
  }
})


console.log("account", profile)


// function to calculate week difference
function calculateWeeks(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date format!";
  }

  const timeDifference = Math.abs(end - start);
  const weeks = Math.ceil(timeDifference / (1000 * 60 * 60 * 24 * 7));

  return weeks;
  
}

// console.log("topSongAttributes", myTopSongsAttributeData,atterror)
  
      console.log("topArtists", myTopArtistData,status);
//      console.log("topSongs", myTopSongsData, error);
//     // console.log(status);


  
    useEffect(() => {
      refetch(), ts(), tsa();
    }, [timeFrame]);
    
    console.log("dbdata", dbData)
    useEffect(() => {
      if (status != "success") return
      const getUserFirebaseData = async () => {

        //promise to get the data from the firestore
        const q = query(collection(db, "ArtistRanking"), where("userID", "==", profile.data.id)); //orderBy("updated","desc")
        await getDocs(q).then((snapshot)=>{  
        console.log("snapshot",snapshot.docs)             
        const newData = snapshot.docs.map((doc) => ({...doc.data(), id:doc.id })).sort((a, b) => a.updated - b.updated);
        
        setDbData(newData);             
        
        
        //console.log("imweak",new Date(), data.docs[0].data().updated.toDate())
        console.log("adsdasdsd",dbData)
        if (dbData.length <= 0 || calculateWeeks(new Date(), dbData.updated.toDate()) > 2) {
          //map over the top artists and add them to the firestore as an array of objects the objects should include the artist name, popularity, ranking position and updated date
          const artistRankings = myTopArtistData?.data.items?.slice(0,10).map((artist, index) => {
            //const artistRankings = myTopArtistData?.data.items?.map((artist, index) => {
              return {
                artistName: artist.name,
                popularity: artist.popularity,
                rank: index + 1,
              };
            }
          );
          console.log("arankings",artistRankings)
          // addDoc(artistCollectionRef, {
            //   userID: profile.data.id,
            //   updated: new Date(),
            //     artistRankings
            //   });
          } else {
          }
        }
      );
      
    }
    getUserFirebaseData()
    }, [status]);
    
  
  
  
  return (


    <div className='sm:w-5/6 sm:grid flex flex-col sm:grid-cols-2 mt-2 w-full'>
    {/*Displaying the data from both api calls and a graph of top artist popularity  -- - - - - - - -  */}

    {/*  Displaying top artists if there is top artist data     */}
    
    {myTopArtistData && myTopArtistData.data?.items ? (
        <>
      
        
      <p className='text-center col-span-2 text-2xl bg-gradient-to-r from-transparent via-neutral-800'> Top Artists </p>
          <div className="grid-cols-2 w-full h-[80vh] overflow-y-scroll scrollbar mt-2 pb-96 ">
             
            
            {myTopArtistData.data.items.map((topArtist, index) => (
              <div key={"topArtist_" + topArtist.id} className=' bg-neutral-800 w-full mt-2 p-1 flex flex-row' >
                <p className='w-14 h-24 text-2xl align-middle text-center '>{index+1}.</p>
                
                
                <img className='w-24 h-24 object-cover aspect-square'
                  src={topArtist.images[0].url}
                  // width="100%"
                  // height="100%"
                ></img>
                <div className='w-full h-full ml-3 '>
                <p className=' text-2xl h-full ' >{topArtist.name}</p>
              <div className='flex h-full'>
                {topArtist.genres.map((topGenres, index) => (
                <p key={index+100} className='text-sm text-neutral-300 mt-8' > {topGenres + ", "}  </p>))}</div>
                </div>
              </div>
            
            ))}
            </div>
          
          <div className=''> <div >
         <TopGenresChart topArtists = {myTopArtistData}/>
        <div className='mt-32 mx-5'><ArtistPopularityChart topArtistsData = {myTopArtistData}/></div></div>
        </div>


        <p className='text-center text-2xl mt-5 col-span-2 bg-gradient-to-r from-transparent via-neutral-800'> Top Songs</p> 
    {/*  Displaying top songs if there is top song data     */}
          {myTopSongsData && myTopSongsData.data?.items ? (

            <div className='grid-cols-2 w-full h-[80vh] overflow-y-scroll scrollbar mt-10' >
             
              {myTopSongsData.data.items.map((topSong, index2) => (
                <div key={"topSongs_" + topSong.id} className=' bg-neutral-800 w-full mt-2 p-1 flex flex-row' >
                  <p className='w-14 h-24 text-2xl align-middle text-center'>{index2+1}.</p>
                  <img
                  src={topSong.album.images[0].url}
                // width="100%"
                // height="100%"
                className='w-24 h-24 object-cover'
                ></img>
                <div className='w-full'>
                <p className='ml-3 w-2/3 h-1/2 text-2xl'> {topSong.name} </p>
                <p className='ml-3 w-2/3 h-1/2 text-xl text-neutral-300' > {topSong.artists[0].name}  </p>
                
                </div>
                  
                </div>
              ))}
            </div>
          ) : null}
        
        </>
      ) : null}

      
      {myTopSongsData && myTopSongsAttributeData && myTopSongsAttributeData.data?.audio_features.length !=0 ? (
      <div >
        <div><TopSongsAnalysis topSongStats = {myTopSongsAttributeData}/></div> 
        <div className='mt-10 bg-red-400'><TopAlbums topSongsAlbums = {myTopSongsData}/></div> 
       </div> ) : null}
      </div> 
      
    
  )
}

export default TopSongsAndArtists







// - - - - -- - - -- - - - - - - - -  Custom tooltip when hovering over points in the popularity chart - - - - -- - - -- - - - - - - - - 
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip flex flex-col items-center justify-center">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p> */}
  
          <p className="text-2xl">{`${label}`}</p>
          <img
            src={payload[0].payload.imgsrc}
            width="30%"
            height="30%"
            className="rounded-md"
          ></img>
          <p className="label">{`Popularity : ${payload[0].payload.popularity}`}</p>
          <p className="label">{`Your #${payload[0].payload.rank + 1} Artist`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
  };