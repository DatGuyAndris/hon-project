import React from 'react'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'

const RecentlyPlayedTracks = () => {

    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const{data:session} = useSession()

    useEffect(()=>{
 
        async function h() {
          if (session && session.accessToken) {
            //setX(session.accessToken) 
            const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
          const data = await response.json()
          setRecentlyPlayed(data.items)
          console.log(recentlyPlayed)

         }
        }
        h()
        
        
      },[session])

  return (



    <div>RecentlyPlayedTracks
        <div>{recentlyPlayed.map((recent)=><div key={recent.id}>{recent.track.name} - {recent.track.artists[0].name} <img src={recent.track.album.images[0].url} width="50%" /> </div>)}</div>
    </div>


  )
}

export default RecentlyPlayedTracks