import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import {useEffect, useState} from "react"

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

   const{data:session} = useSession()
   const [x, setX] = useState('')
   const [playlists, setPlayLists] = useState([])

   useEffect(()=>{
    
    
    if (session && session.accessToken) {
      setX(session.accessToken) 
  
   }
  },[session])
   
   //console.log(session.user.accessToken)
  return (
    <main
      className=""
    >
      <div> aaaa///  access token: {x}</div>
      <div> Playlists: {playlists.map((playlist)=><div key={playlist.id}>{playlist.name}</div>)}</div>
      
    </main>
  )
}
