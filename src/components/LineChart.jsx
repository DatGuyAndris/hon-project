'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from "recharts";
import TopGenresChart from './TopGenresChart';
import ArtistPopularityChart from './ArtistPopularityChart';

const LineChart2 = ({myTopArtistData}) => {


  


  return (


    <div>
           <div className="w-full h-96">
            <ResponsiveContainer>
              <LineChart
                //width={1400}
                //height={400}
                data={myTopArtistData.data.items.map((topArtist2, index) => ({
                  name: topArtist2.name,
                  popularity: topArtist2.popularity,
                  rank: index,
                  imgsrc: topArtist2.images[0].url,
                }))}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="popularity"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div></div>
  )
}

export default LineChart


const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip flex flex-col items-center justify-center">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p> */}
  
          <p className="text-2xl">{`${label}`}</p>
          <img
            src={payload[0].payload.imgsrc}
            width="30%"
            height="30%"
            className="rounded-md"
          ></img>
          <p className="label">{`Popularity : ${payload[0].payload.popularity}`}</p>
          <p className="label">{`Your #${payload[0].payload.rank + 1} Artist`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
  };