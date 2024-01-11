import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import {useEffect, useState} from "react"
import axios from 'axios'

import TopSongsTwo from './TopSongsTwo'
import RecentlyPlayedTracks from './RecentlyPlayedTracks'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

   const{data:session} = useSession()
   const [x, setX] = useState('')
   const [topArtists, setTopArtists] = useState([])

   useEffect(()=>{

    async function f() {
      if (session && session.accessToken) {
        setX(session.accessToken) 
        const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      })
      const data = await response.json()
      setTopArtists(data.items)
      
      console.log(topArtists)
     }
    }
    f()
    
  },[session])
 //topsongs()
 
   
   //console.log(session.user.accessToken)
  return (
    <main 
      className="flex flex-col items-center"
    > 
      <div> aaaa///sss  access token: {x}</div>
      <div className=' grid grid-cols-10  content-start mt-20'> {topArtists.map((topArtist)=><div key={topArtist.id}>{topArtist.name} - Popularity: {topArtist.popularity} <img src={topArtist.images[0].url } width='50%' height='50%'></img></div>)}</div>
      <div className='mt-20'><TopSongsTwo/>  </div>
      <div className='mt-20'><RecentlyPlayedTracks/>  </div>
    </main>
  )
}
