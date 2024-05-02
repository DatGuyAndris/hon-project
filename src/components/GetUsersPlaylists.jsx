'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Link from 'next/link';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GetUsersPlaylists = () => {

    const{data:session} = useSession()
    const [groups, setGroups] = useState({}) 


    const {data:playlists} = useQuery({
        queryKey:["playlists"],
        enabled:!!session,
        refetchOnWindowFocus: false,    
        queryFn:() => {
          
          return axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
        }
      })

      const {
        data: myMediumTermSongs, 
      } = useQuery({
        queryKey: ["myLongTermSongsQuery"],
        enabled: !!session,
        queryFn: () => {
          return axios.get("https://api.spotify.com/v1/me/top/tracks", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            params: {
              limit: 40,
              time_range: "medium_term"
            },
          });
        },
      });

      const noOfPlaylists = playlists?.data.items.length

      //Sorts the playlists by amount of songs
      const longestPlaylists = playlists?.data.items.map((long) => 
      ({total: long.tracks.total,
        name: long.name,
      link:long.external_urls.spotify }) ).sort((a, b) => b.total - a.total)

      //Groups top songs by release date and counts songs for each year
        
      useEffect(() => {
        const something = myMediumTermSongs?.data?.items?.reduce((acc, longSong) => {
          const year = longSong.album.release_date?.substring(0, 4) ?? "Unknown";
          if (!acc[year]) {
            acc[year] = {
              songs: [],
              songCount: 0,
              year
            };
          }
          acc[year].songs.push({
            name: longSong.name,
            album: longSong.album ? longSong.album.name : "Unknown",
            released: longSong.album ? (longSong.album.release_date?.substring(0, 4) ?? "Unknown") : "Unknown",
            count: acc[year].songCount + 1,
            imgsrc: longSong.album?.images[0]?.url,
            artist: longSong.artists[0].name
          });
          acc[year].songCount++;
          return acc;
        }, {});
        setGroups(something);
    console.log("groups",groups)
      }, [myMediumTermSongs]);
          
      
  return (


    <div className='mt-5 text-3xl w-full h-full mb-10 flex flex-col text-center'>

      <p className='bg-gradient-to-r from-transparent via-neutral-800'> More </p>

      <p className='my-5'> You have {noOfPlaylists} public playlists</p>

      <div className='flex flex-row'>
      <p className='w-1/3 text-2xl my-5 bg-gradient-to-r from-transparent via-neutral-800 ml-2'>Your playlists by length</p>
      <p className=' w-2/3 text-2xl my-5 ml-32 bg-gradient-to-r from-transparent via-neutral-800'>Release year of your top songs from last 6 months</p>
      </div>

      <div className='flex flex-row'>
      {!!playlists && longestPlaylists?.length > 0 ? (
        <>
        <div className='w-1/3 h-[60vh] overflow-y-scroll scrollbar mt-2'> 
        
        {longestPlaylists.map((long,index) => 
      <div key={long.name} >
        <div className='bg-neutral-800 hover:bg-neutral-700 h-16 my-2 w-full flex flex-row text-center items-center justify-center'>
        <p className='text-2xl font-bold '>{index +1}.</p>  
          <div className='text-2xl w-4/6 text-left  ml-2'>
        <Link href={long.link} target='_blank'><p className='hover:underline'>{long.name}</p></Link>
        </div>

        <p className='text-xl w-fit'> {long.total} Songs </p>
        </div>
      </div>
      )}
     </div>
     
     
      </>): <p>Loading ...</p> }

      <div className='w-2/3 p-10 text-2xl'>
    {!!groups ? (  
      <ResponsiveContainer>
        <BarChart
          
            data={Object.values(groups)}
          margin={{
            top: 30,
            right: 20,
            left: 40,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="songCount" fill="#004a06" activeBar={<Rectangle fill="green" stroke="black" />} />

        </BarChart>
      </ResponsiveContainer> ) : <p> Loading ... </p> }

     </div>
      
     </div>
    
    
    </div>
  )
}

export default GetUsersPlaylists

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    console.log("push the ",payload[0].payload)
    return (
      <div className=" flex flex-col items-center justify-center bg-neutral-800 bg-opacity-50">
        <p className="text-l">{label}</p>

        {payload[0].payload.songs.map((song) => (
          <div key={song.dataKey} className='flex items-center grid-rows-2 space-x-4 hover:bg-white hover:bg-opacity-10 mb-2 text-l w-full '>
            <p className="text-base">{song.count}.  {song.name} - {song.artist} </p>
          </div>
        ))}
      </div>
    );
  }


  return null;
};