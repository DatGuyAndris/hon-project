
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { interpolateNumberArray } from 'd3'
import { compare } from 'mathjs'
import validgenre from '../lib/realgenrelist.json' 
import { list } from "postcss";



const GetRecommendationsTopSongs = ({setPlayThisUri, playThisUri}) => {

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
  // function to get the average
  function getAverageThing(array) {
    // Check if the array is empty or contains only zeros
    //console.log("arrayForPopularity",array)
    if (array?.length === 0 ) {
        return 0;
    }
    return array?.reduce((acc, val) => acc + val, 0) / array?.length;
  }



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
    // replaces spaces with - as thats what they use instead of spaces for the spotify seed genres
    const changeSpaces = updatedGenres.map((genre) => {
      return genre.genre.replace(/\s/g, "-");
    });


    //sorts and counts genres and matches the users genres to the spotify seed genres
    const genresToUse =  changeSpaces
    .sort((a,b) => b.count - a.count)
    .map((genre) => {
      const matchingGenre = validgenre.realgenres.find((jsonGenre) => genre.includes(jsonGenre));
      return matchingGenre ? matchingGenre : null;
    })
    .filter((genre, index, self) => self.indexOf(genre) === index && genre!== null).join(",")



   const listPopularity = topSongsforRec?.data.items.map((pop) => pop.popularity)

   //gets average popularity and uses 90% of it for recommendations
   const averagePopularity = (getAverageThing(listPopularity) * 0.9).toFixed(0)

   //top 2 artists
   const topTwoArtists = topSongsforRec?.data?.items.map((id) => id.id).slice(0,2).join(",")
   
 
  // Api Call for recommendations based on top songs  - - -- - - - - - - -- - - 
  const {data:recSongsDatafromTop,error:genreserr} = useQuery({
    queryKey:["recSongsQuery2",genresToUse,topTwoArtists],
    enabled:!!session && !!genresToUse && !!averagePopularity,
    refetchOnWindowFocus: false,    
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/recommendations", {
        params: {
          seed_artists:topTwoArtists,
          seed_genres: genresToUse,
          max_popularity: averagePopularity,
          limit: 40
          
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
    }
  })

  return (

    <div className='flex flex-col h-full mt-10 mb-20'>
    <div className='grid-cols-2 h-full'> 
    <p className='text-xl mb-5 text-center bg-gradient-to-r from-transparent via-neutral-800'> Based on your top songs </p>

    {recSongsDatafromTop && recSongsDatafromTop.data.tracks ? (
      <div className='w-full grid-cols-2 text-neutral-200 h-[80vh] overflow-y-scroll scrollbar'> 
        {recSongsDatafromTop.data?.tracks.map((recSong)=>
          <div key={"recommended_"+recSong.id} className='flex items-center grid-rows-2 space-x-4 bg-neutral-800 hover:bg-white hover:bg-opacity-10 mb-2 text-l  w-full'>
           
            <img
                src={recSong.album.images[0].url}
                className='w-16 h-16'
                ></img>

                <div className='w-5/6'>
           <p className='text-xl'>{recSong.name} </p>  
           <Link href={recSong.artists[0].external_urls.spotify} target='_blank'><p className='hover:underline w-fit text-sm hover:cursor-pointer mt-2 text-neutral-300'>{recSong.artists[0].name}</p></Link>
           </div>
           <div className='w-52 text-right'> {<PlayIcon className='w-9 h-9 float-end mr-10 text-neutral-500 hover:text-green-700 mt-2' onClick={() => {setPlayThisUri(recSong.uri)}}/>}</div>
             </div>)}
          
      </div> ) : (null)}
    </div></div>

  )
}

export default GetRecommendationsTopSongs