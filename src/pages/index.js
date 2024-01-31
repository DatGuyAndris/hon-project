import Image from 'next/image'
import { Content, Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import {useEffect, useState} from "react"
import axios from 'axios'
import TopSongsTwo from './TopSongsTwo'
import RecentlyPlayedTracks from './RecentlyPlayedTracks'
import { useQuery } from '@tanstack/react-query'
import GetCurrentSong from './GetCurrentSong'
import Navbar from './Navbar'
import Login from './login'
import {signIn} from "next-auth/react"
import TimeNavBar from './TimeNavBar'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';




const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  // The api call for top artists, refetch to change the params for selected time frame 
   const [timeFrame, setTimeFrame] = useState('short_term')
   const{data:session} = useSession()
   const {data:myTopArtistData,status,refetch} = useQuery({
    queryKey: ["myTopArtistQuery"],
    enabled:!!session,
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        },
         params: {
          time_range: timeFrame
        }
       })
    } 
   })
   console.log("topArtists",myTopArtistData)
   console.log(status)

   useEffect(() => {
   refetch()
  }, [timeFrame]);



  return (
    <main 
      className="flex flex-col items-center"> 

      <div>access token: {session?.accessToken}  </div>
      <Navbar/>
      <div>
        
      </div>
      <TimeNavBar setTimeFrame={setTimeFrame}/>
      

      <div className='mt-20'> <GetCurrentSong/> </div>



      {/* Top Artists graph, checks for data first then displays it  */}
      {myTopArtistData?.data?.items  ? ( <>
       <div className=' grid grid-cols-1  content-start mt-20 max-h-96 overflow-y-auto'> {myTopArtistData.data?.items.map((topArtist)=><div key={topArtist.id}>{topArtist.name}
        - Popularity: {topArtist.popularity} <img src={topArtist.images[0].url } width='30%' height='30%'></img></div>)}
        </div> 


        {/* The chart itself */}
       <div className='w-3/4 h-96'><ResponsiveContainer>
        <LineChart
          //width={1400}
          //height={400}
          data={myTopArtistData.data.items.map((topArtist2,index)=> ({name: topArtist2.name, popularity: topArtist2.popularity, rank: index, imgsrc: topArtist2.images[0].url}))}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="name" className='text-xs' />
          <YAxis />
          <Tooltip content={<CustomTooltip/>} />
          <Legend />
        
          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
          <Line type="monotone" dataKey="popularity" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart> </ResponsiveContainer> </div> 
      </>
        )
        
        
        : (null)} 
       <div className='mt-20'><TopSongsTwo/>  </div> 
      <div className='mt-20'><RecentlyPlayedTracks/>  </div>
      
      
    </main>
  ) 
} 







// Custom tooltip when hovering over points in the popularity chart

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-col items-center justify-center">
        {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p> */}
        
        <p className="text-2xl">{`${label}`}</p>
        <img src={payload[0].payload.imgsrc } width='30%' height='30%' className='rounded-md'></img>
        <p className="label">{`Popularity : ${payload[0].payload.popularity}`}</p>
        <p className="label">{`Your #${payload[0].payload.rank + 1} Artist`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};