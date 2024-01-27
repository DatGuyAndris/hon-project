import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import {useEffect, useState} from "react"
import axios from 'axios'
import TopSongsTwo from './TopSongsTwo'
import RecentlyPlayedTracks from './RecentlyPlayedTracks'
import { useQuery } from '@tanstack/react-query'
import GetCurrentSong from './GetCurrentSong'
import Navbar from './Navbar'
import Login from './login'
import TimeNavBar from './TimeNavBar'
import * as d3 from 'd3';
import LineChartTopArtists from './LineChartTopArtists'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  
   const{data:session} = useSession()
   const {data:myTopArtistData,status} = useQuery({
    queryKey: ["myTopArtistQuery"],
    enabled:!!session,
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
        params: {
          time_range: "long_term"
        }
      })
    } 
   })

   console.log(myTopArtistData)
   console.log(status)

  return (
    <main 
      className="flex flex-col items-center"
    > 
      <div> aaaa///sss  access token: {session?.accessToken}  </div>
      <Navbar/>
      <div>
         <a href={"http://localhost:3000/login"}> 
          <button class="bg-gray-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-half" > Login Page </button> 
         </a>
      </div>
      <TimeNavBar/>
      


      <div className='mt-20'> <GetCurrentSong/> </div>


      {myTopArtistData && myTopArtistData.data?.items ? (
       <div className=' grid grid-cols-10  content-start mt-20'> {myTopArtistData.data?.items.map((topArtist)=><div key={topArtist.id}>{topArtist.name}
        - Popularity: {topArtist.popularity} <img src={topArtist.images[0].url } width='50%' height='50%'></img></div>)}</div> ): (null)} 
       <div className='mt-20'><TopSongsTwo/>  </div> 
      <div className='mt-20'><RecentlyPlayedTracks/>  </div>
      <LineChartTopArtists/>
      
    </main>
  ) 
} 

