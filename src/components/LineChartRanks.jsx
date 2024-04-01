'use client'
import { db } from '@/lib/firebase';
import React, { useEffect, useState } from "react";
import { collection,getDocs,query,where} from 'firebase/firestore';
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


const LineChartRanks = ({dbDataforGraph}) => {

console.log("fulldb", dbDataforGraph.map((stat) => {
  return stat.artistRankings.map((artist) => {
    return {
      name: artist.artistName,
      popularity: artist.popularity,
      rank: artist.rank + 1,
      date: new Date(stat.updated.seconds * 1000).toLocaleDateString() // Convert date to localized string
    };
  });
}))

const groupDataByWeek = (data) => {
  const groupedData = {};
  data.forEach((entry) => {
      const week = new Date(entry.updated.seconds * 1000).toLocaleDateString("en-UK", {year: 'numeric', month: '2-digit', day: '2-digit'});
      if (!groupedData[week]) {
          groupedData[week] = {};
      }
      entry.artistRankings.forEach((artist) => {
          if (!groupedData[week][artist.artistName]) {
              groupedData[week][artist.artistName] = artist.rank;
          } else {
              // Check if the existing rank is lower than the current rank
              if (artist.rank < groupedData[week][artist.artistName]) {
                  groupedData[week][artist.artistName] = artist.rank;
              }
          }
      });
  });
  return groupedData;
};

// Get data grouped by week
const groupedData = groupDataByWeek(dbDataforGraph);

// Prepare data for LineChart
const chartData = Object.keys(groupedData).sort((a, b) => new Date(a.date) - new Date(b.date)).map((week) => ({
  date: week,
  ...groupedData[week]
}))


console.log("dbdataok", dbDataforGraph)

  return (


    <div>
           <div className="w-full h-96 mt-5">
           <ResponsiveContainer>
    <LineChart
        data={chartData}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
    >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="date" className="text-xs p-2" />
        <YAxis />
        <Tooltip />
        <Legend />

        {Object.keys(chartData[0]).map((key) => {
            if (key !== 'date') {
                return (
                    <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
                        activeDot={{ r: 5 }}
                    />
                );
            }
            return null;
        })}
    </LineChart>
</ResponsiveContainer>
            
          </div></div>
  )
}

export default LineChartRanks


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