import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid'


 const GetCurrentSong = () => {

    const{data:session} = useSession()
    const {data:currentlyPlayingData} = useQuery({
        queryKey:["currentlyPlayingQuery"],
        enabled:!!session,
        queryFn:() => {
          return axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
        }
      })
      if(currentlyPlayingData && currentlyPlayingData.data.is_playing === true) {
        console.log("currently playing:",currentlyPlayingData.data)
      } else {console.log("not playing")}
      

   return (
     <div className='bg-neutral-800 w-full justify-center items-center flex'>{currentlyPlayingData && currentlyPlayingData.data? (
      <>
      <div key={currentlyPlayingData.data.item.id} className=' w-5/6 flex flex-row items-center justify-between'> 
        
          <img className='w-20 h-20' src={currentlyPlayingData.data.item.album.images[0].url}/> 
           <p className='text-2xl text-green-200 '>{currentlyPlayingData.data.item.name} - {currentlyPlayingData.data.item.artists[0].name}</p>

           {!currentlyPlayingData.data.is_playing ?
           
           
           <button> <PlayIcon className='text-red-300 w-12 h-12'/> </button> : <button> <PauseIcon className='text-red-300 w-12 h-12'/> </button>}
           
           </div>
      </>
    ) : (<><div> Not Playing anything at the moment</div></>)}
</div>
   )
 }
 
 export default GetCurrentSong