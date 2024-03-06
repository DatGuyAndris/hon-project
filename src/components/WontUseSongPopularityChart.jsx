'use client'
import React, { PureComponent }  from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WontUseSongPopularityChart = ({topSongsData}) => {

    
  return (
    <> <div className="h-96 m-5 w-full block"> 
   <p className='text-center text-xl mb-3'>Top Song Popularity</p>
        <ResponsiveContainer>
        <BarChart
          
            data={topSongsData?.data.items.map((topSong, index) => ({
            name: topSong.name,
            popularity: topSong.popularity,
            rank: index +1,
            imgsrc: topSong.album.images[0].url,
          }))}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="10 3" />
          <XAxis dataKey="rank" />
          <YAxis />
          {/* <Tooltip content={<CustomTooltip />} /> */}
          <Legend />
          <Bar dataKey="popularity" fill="#004a06" activeBar={<Rectangle fill="pink" stroke="blue" />} />

        </BarChart>
      </ResponsiveContainer> 
      </div> </>

  )
}

export default WontUseSongPopularityChart