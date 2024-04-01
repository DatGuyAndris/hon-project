
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { interpolateNumberArray } from 'd3'
import { compare } from 'mathjs'



const GetRecommendationsTopSongs = (setPlayThisUri, playThisUri) => {

  const{data:session} = useSession()
  // const [genresList, setGenresList] = useState({});

  // API call for Top Songs Medium term to be used for recommendations  - - - -- - - - - - - - -- 
  const {
    data: topSongsforRec,
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
          time_range: "medium_term"
        },
      });
    },
  });



  // console.log("topSongsForRec",topSongsforRec)

  // Gets the genres from the top songs, lists and counts them 
  let updatedGenres = [];
    topSongsforRec?.data.items?.map((item) => {
      item.genres.map((genre) => {
        
        let genreExists = false;
        updatedGenres.map((genreStuff) => {
          if (genreStuff.genre === genre) {
            genreExists = true;
            genreStuff.count++;
          }
        });
        if (!genreExists && updatedGenres.length < 10) {
          updatedGenres.push({ genre: genre, count: 1 });
        }
      });
    });
    // Sorts the list of genres by count and makes a new list of the top 2 
    const listedGenres =  updatedGenres?.sort((a,b) => b.count - a.count)
    const genresToPreUse = listedGenres.map((genre) => genre.genre)
    const genresToUse = genresToPreUse.slice(0,2).join(",")

  // console.log("genreslist" , listedGenres)
  // console.log("genrestouse", genresToUse)



    console.log("topsongsforrec",topSongsforRec)
 
  // Api Call for recommendations based on top songs  - - -- - - - - - - -- - - 
  const {data:recSongsDatafromTop} = useQuery({
    queryKey:["recSongsQuery2"],
    enabled:!!session,
    refetchOnWindowFocus: false,    
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/recommendations", {
        params: {
          seed_artists: "6fxyWrfmjcbj5d12gXeiNV",
          max_popularity: 50
          
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
    }
  })

  console.log("recsongsFromTop",recSongsDatafromTop)
  return (

    <div className='flex flex-col'>
    
    <div className='grid-cols-2 h-[80vh] overflow-y-scroll scrollbar'> 
    <p className='text-xl m-2'> Recommended from recent listening </p>
    
    {recSongsDatafromTop && recSongsDatafromTop.data.tracks ? (
      <div className='w-full grid-cols-2 text-neutral-200 py-2'> 
      
      
      
        {recSongsDatafromTop.data?.tracks.map((recSong)=>
          <div key={"recommended_"+recSong.id} className='flex items-center grid-rows-2 space-x-4 bg-neutral-800 hover:bg-white hover:bg-opacity-10 mt-2 text-l w-full'>
            <img
                src={recSong.album.images[0].url}
                className='w-20 h-20'
                ></img>
                <div className='w-5/6'>
           <p className='text-xl'>{recSong.name} </p>  
           <Link href={""}><p className='hover:underline w-fit hover:cursor-pointer'>{recSong.artists[0].name}</p></Link>
           
           
           </div>
           <div className='w-52 text-right'> {<PlayIcon className='w-11 h-11 float-end mr-10 text-neutral-500 hover:text-green-700 mt-2' onClick={() => {setPlayThisUri(recSong.uri)}}/>}</div>
             </div>)}
          
             

      </div> ) : (null)}
    </div></div>

  )
}

export default GetRecommendationsTopSongs