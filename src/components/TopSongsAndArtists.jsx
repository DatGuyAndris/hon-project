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

// Function to calculate 2 weeks difference
function calculateWeeks(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return "Invalid date format!";
  }
  const timeDifference = Math.abs(end - start);
  // Convert milliseconds to weeks
  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);
  return weeksDifference > 2;
}

    useEffect(() => {
      refetch(), ts(), tsa();
    }, [timeFrame]);



    //Checking if current user has data in database and if last data was over 2 weeks ago, if yes add new data to the db
    useEffect(() => {
  if (status !== "success") return;

  const getTest = async () => {
    const snapshot = await getDocs(query(artistCollectionRef, where("userID", "==", session.user.email), orderBy("updated", "desc")));
    const newData = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    //console.log("adsdasdsd", newData);
    setDbData(newData);

    if (newData.length === 0 || calculateWeeks(new Date(), newData[0]?.updated.toDate())) {
      addToFB();
    }
  };
  const addToFB = () => {
    const artistRankings = myTopArtistData?.data.items?.slice(0, 10).map((artist, index) => {
      return {
        artistName: artist.name,
        popularity: artist.popularity,
        rank: index + 1,
      };
    });
    addDoc(artistCollectionRef, {
      userID: session.user.email,
      updated: new Date(),
      artistRankings
    });
  };

  getTest();
}, [status]);
    
  
  
  
  return (


    <div className='sm:w-5/6 sm:grid flex flex-col sm:grid-cols-2 mt-2 w-full pb-16'>
    {/*Displaying the data from both api calls and a graph of top artist popularity  -- - - - - - - -  */}
    {/*  Displaying top artists if there is top artist data     */}
    
    {myTopArtistData && myTopArtistData.data?.items ? (
        <>
      <p className='text-center col-span-2 text-2xl bg-gradient-to-r from-transparent via-neutral-800 mb-2'> Top Artists </p>
          <div className="grid-cols-2 w-full max-h-[80vh] overflow-y-scroll scrollbar mt-2">
             
            
            {myTopArtistData.data.items.map((topArtist, index) => (
              <div key={"topArtist_" + topArtist.id} className=' bg-neutral-800 w-full mb-2 max-h-20 flex flex-row' >
                <p className='w-14 h-24 text-2xl align-middle text-center '>{index+1}.</p>
                
                <img className='w-20 h-20 object-cover aspect-square'
                  src={topArtist.images[0].url}
            
                ></img>
                <div className='w-full h-full ml-3 '>
                <p className=' text-2xl h-full ' >{topArtist.name}</p>
              <div className='flex h-full'>
                {topArtist.genres.map((topGenres, index) => (
                <p key={index+100} className='text-sm text-neutral-300 mt-6' > {topGenres + ", "}  </p>))}</div>
                </div>
              </div>
            ))}
            </div>
          
          <div className='justify-center align-middle text-center'> <div >
         <TopGenresChart topArtists = {myTopArtistData}/>
        <div className='mt-20 mx-5 justify-center text-center align-middle'><ArtistPopularityChart topArtistsData = {myTopArtistData}/></div></div>
        </div>


        <p className='text-center text-2xl mt-5  col-span-2 bg-gradient-to-r from-transparent via-neutral-800'> Top Songs</p> 
    {/*  Displaying top songs if there is top song data     */}
          {myTopSongsData && myTopSongsData.data?.items ? (

            <div className='grid-cols-2 w-full h-[80vh] overflow-y-scroll scrollbar mt-10 mb-10' >
             
              {myTopSongsData.data.items.map((topSong, index2) => (
                <div key={"topSongs_" + topSong.id} className=' bg-neutral-800 w-full mb-2 max-h-20 flex flex-row' >
                  <p className='w-14 h-24 text-2xl align-middle text-center'>{index2+1}.</p>
                  <img
                  src={topSong.album.images[0].url}
                className='w-20 h-20 object-cover'
                ></img>
                <div className='w-full'>
                <p className='ml-3 w-5/6 h-1/2 text-2xl mb-3 overflow-auto'> {topSong.name} </p>
                <p className='ml-3 w-2/3 h-1/2 text-l text-neutral-300' > {topSong.artists[0].name}  </p>
                
                </div>
                </div>
              ))}
            </div>
          ) : null}
        
        </>
      ) : null}

      {myTopSongsData && myTopSongsAttributeData && myTopSongsAttributeData.data?.audio_features.length !=0 ? (
      <div className='' >
        <div><TopSongsAnalysis topSongStats = {myTopSongsAttributeData}/></div> 
        <div className='mt-10 mx-10 text-center items-center justify-center'><TopAlbums topSongsAlbums = {myTopSongsData}/></div> 
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