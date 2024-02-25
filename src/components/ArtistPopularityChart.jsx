'use client'
import React, { PureComponent }  from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const ArtistPopularityChart = ({topArtistsData}) => {
    

    
  return (
   <> <div className="h-96 m-5 w-full block"> 
   <p className='text-center text-xl mb-3'>Top Artist Popularity</p>
        <ResponsiveContainer>
        <BarChart
          
            data={topArtistsData?.data.items.map((topArtist2, index) => ({
            name: topArtist2.name,
            popularity: topArtist2.popularity,
            rank: index +1,
            imgsrc: topArtist2.images[0].url,
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
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="popularity" fill="#004a06" activeBar={<Rectangle fill="pink" stroke="blue" />} />

        </BarChart>
      </ResponsiveContainer> 
      </div> </>



   
  )
}

export default ArtistPopularityChart


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip flex flex-col items-center justify-center">
        {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p> */}

        <p className="text-2xl">{`${payload[0].payload.name}`}</p>
        <img
          src={payload[0].payload.imgsrc}
          width="30%"
          height="30%"
          className="rounded-md"
        ></img>
        <p className="label">{`Popularity : ${payload[0].payload.popularity}`}</p>
        <p className="label">{`Your #${payload[0].payload.rank } Artist`}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }

  return null;
};