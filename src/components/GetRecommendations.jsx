import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'



const GetRecommendations = ({songs}) => {

  const{data:session} = useSession()

  const seedTracks =  songs?.map((song) => song.track.id);
   const seedTrackIds = seedTracks.slice(0,3).join(",")


   const seedArtists = songs?.map((artist) => artist.track.artists[0].id);
   const seedArtistIds = seedArtists.slice(0,2).join(",")

  console.log("seed",seedTrackIds)


  const {data:recSongsData, status, error} = useQuery({
      queryKey:["recSongsQuery",songs],
      enabled:!!session,
      refetchOnWindowFocus: false,    
      queryFn:() => {
        const seedsongs = ""
        return axios.get("https://api.spotify.com/v1/recommendations", {
          params: {
            seed_tracks: seedTrackIds,
            seed_artists: seedArtistIds,
            max_popularity: 50,
            
           // seed_genres: "rap"
          },
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
      }
    })

    const [playThisUri,setPlayThisUri] = useState()

    const {refetch:refetchNewSong, error:auth} = useQuery({
        queryKey:["addToQeuue"],
        enabled:false,
        refetchOnWindowFocus: false,
        
        queryFn:() => {
          return axios.put("https://api.spotify.com/v1/me/player/play", {
            params: {
              uris: [playThisUri],
              position_ms:0
              
            },
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              Content_Type: "application/json"
            
              
            }
          })
        }
      })

  
    console.log("recommended:", recSongsData, status, error)
      console.log("auth", auth)
      console.log("play", playThisUri)
    


  return (
    <div className='grid-cols-2'> 
    {session.accessToken && recSongsData && recSongsData.data?.tracks ? (
      <div className='w-full grid-cols-2 text-neutral-200 py-2'> Recommended
      
        {recSongsData.data?.tracks.map((recSong)=>
          <div key={"recommended_"+recSong.id} className='flex items-center grid-rows-2 space-x-4 bg-neutral-800 hover:bg-white hover:bg-opacity-10 mt-2 text-l w-full'>
            <img
                src={recSong.album.images[0].url}
                className='w-20 h-20'
                ></img>
                <div className='w-5/6'>
           <p className='text-xl'>{recSong.name} </p>  
           <Link href={""}><p className='hover:underline w-fit hover:cursor-pointer'>{recSong.artists[0].name}</p></Link>
           
           </div>
           <div className='w-52 text-right'> {<QueueListIcon className='w-11 h-11 float-end mr-10 text-neutral-500 hover:text-green-700 mt-2' onClick={() => {setPlayThisUri(recSong.uri), refetchNewSong()}}/>}</div>
             </div>)}

             

      </div> ) : (null)}
    </div>
  )
}

export default GetRecommendations