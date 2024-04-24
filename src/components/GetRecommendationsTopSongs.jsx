
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
    console.log("arrayForPopularity",array)
    if (array?.length === 0 ) {
        return 0;
    }
    return array?.reduce((acc, val) => acc + val, 0) / array?.length;
  }

  const listPopularity = topSongsforRec?.data.items.map((pop) => pop.popularity)
  const averagePopularity = getAverageThing(listPopularity).toFixed(0)
  console.log("averagepopul",averagePopularity)

 //console.log("topSongsForRec",topSongsforRec)

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
    const changeSpaces = updatedGenres.map((genre) => {
      return genre.genre.replace(/\s/g, "-");
    });

    const genresToUse =  changeSpaces
    .sort((a,b) => b.count - a.count)
    .map((genre) => {
      const matchingGenre = validgenre.realgenres.find((jsonGenre) => genre.includes(jsonGenre));
      return matchingGenre ? matchingGenre : null;
    })
    .filter((genre, index, self) => self.indexOf(genre) === index && genre!== null).join(",")

  // console.log("genreslist" , listedGenres)
   console.log("genrestouse", genresToUse)
   //console.log("aa", validgenre)
   console.log("updated", updatedGenres)



    //console.log("topsongsforrec",topSongsforRec)
 
  // Api Call for recommendations based on top songs  - - -- - - - - - - -- - - 
  const {data:recSongsDatafromTop,error:genreserr} = useQuery({
    queryKey:["recSongsQuery2",genresToUse],
    enabled:!!session && !!genresToUse && !!averagePopularity,
    refetchOnWindowFocus: false,    
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/recommendations", {
        params: {
          seed_genres: genresToUse,
          max_popularity: averagePopularity
          
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
    }
  })
  console.log("errr", genreserr)
  console.log("recsongsFromTop",recSongsDatafromTop)
  return (



    <div className='flex flex-col'>
    <div className='grid-cols-2 h-[80vh] overflow-y-scroll scrollbar'> 
    <p className='text-xl m-2'> Recommended from your top songs </p>

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