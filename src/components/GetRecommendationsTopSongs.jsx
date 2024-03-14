
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { interpolateNumberArray } from 'd3'
import { compare } from 'mathjs'
const GetRecommendationsTopSongs = () => {

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

  console.log("topSongsForRec",topSongsforRec)

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

  console.log("genreslist" , listedGenres)
  console.log("genrestouse", genresToUse)







 
  // Api Call for recommendations based on top songs  - - -- - - - - - - -- - - 
  const {data:recSongsDatafromTop} = useQuery({
    queryKey:["recSongsQuery2"],
    enabled:!!session,
    refetchOnWindowFocus: false,    
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/recommendations", {
        params: {
          seed_genres: "rap",
          max_popularity: 40
          
         // 
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
    }
  })

  return (


    
    <div>GetRecommendationsTopSongs</div>
  )
}

export default GetRecommendationsTopSongs