import React from 'react'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'

const TopSongsTwo = () => {
    const [topSongs, setTopSongs] = useState([])
    const{data:session} = useSession()

    useEffect(()=>{
 
        async function g() {
          if (session && session.accessToken) {
            //setX(session.accessToken) 
            const response = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
          const data = await response.json()
          setTopSongs(data.items)
          console.log(topSongs)
         }
        }
        g()
        
      },[session])





  return (
    <div> Songs: {topSongs.map((topSong)=><div key={topSong.id}>{topSong.name} - {topSong.artists[0].name} </div>)}</div>
  )
}

export default TopSongsTwo