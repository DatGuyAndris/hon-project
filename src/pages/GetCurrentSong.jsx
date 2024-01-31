import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'


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
     <div>GetCurrentSong</div>
   )
 }
 
 export default GetCurrentSong