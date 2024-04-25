
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const GetRecommendations = ({songs,recentAttributes, setPlayThisUri, playThisUri}) => {

  const{data:session} = useSession()
  const [avePop, setAvePop] = useState({});

// making the list of tracks and artists to be used for seeding recommendations
  const seedTracks =  songs?.map((song) => song.track.id);
   const seedTrackIds = seedTracks.slice(0,4).join(",")

   const seedArtists = songs?.map((artist) => artist.track.artists[0].id);
   const seedArtistIds = seedArtists.slice(6,7).join(",")

 // console.log("seed",seedTrackIds)
  
const listForPop = [
  {value: songs?.map((songPop) => songPop.track.popularity)
   }
]
useEffect(() => {
  const avePops = listForPop.map(item3 => ({
    value: item3.value,
    average: getAverageThing(item3.value).toFixed(0)
}));

setAvePop(avePops);
}, [])

const actualAve = avePop[0]?.average

const aveDance = parseFloat(recentAttributes[0].value)
const aveEnergy = parseFloat(recentAttributes[1].value)
const aveValence = parseFloat(recentAttributes[2].value)
const aveSpeech = parseFloat(recentAttributes[3].value)

  const {data:recSongsData, status, error} = useQuery({
      queryKey:["recSongsQuery",songs,actualAve,aveDance,aveEnergy],
      enabled:!!session,
      refetchOnWindowFocus: false,    
      queryFn:() => {
        return axios.get("https://api.spotify.com/v1/recommendations", {
          params: {
            seed_tracks: seedTrackIds,
            seed_artists: seedArtistIds,
            max_popularity: actualAve,
            target_danceability: aveDance,
            target_energy: aveEnergy,
            target_speechiness:aveSpeech,
            target_valence: aveValence,
          },
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
      }
    })

    function getAverageThing(array) {
      //console.log("arrayForPopularity",array)
      if (array.length === 0 ) {
          return 0;
      }
      return array.reduce((acc, val) => acc + val, 0) / array.length;
    }
    //console.log("recommended:", recSongsData, status, error)
      // console.log("auth", auth)
      
  return (
    <div className='flex flex-col '>
    
    <div className='grid-cols-2 '> 
    <p className='text-xl m-2'> Recommended from recent listening </p>
    
    {session.accessToken && recSongsData && recSongsData.data?.tracks ? (
      <div className='w-full grid-cols-2 text-neutral-200 py-2 h-[80vh] overflow-y-scroll scrollbar '> 
      
      
        {recSongsData.data?.tracks.map((recSong)=>
          <div key={"recommended_"+recSong.id} className='flex items-center grid-rows-2 space-x-4 bg-neutral-800 hover:bg-white hover:bg-opacity-10 mt-2 text-l w-full '>
            <img
                src={recSong.album.images[0]?.url}
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

export default GetRecommendations