"use client";
import { Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const TopSongsAnalysis = ({topSongStats: stats}) => {


    const [averageStat, setAverageStat] = useState({});
    const [indStat, setIndStat] = useState({});

    const data = [ 
      {
        attribute: "Acoustiness", 
        value:  stats.data.audio_features.map((song) => 
          song.acousticness),
        },
        {
          attribute: "Instrumentalness", 
          value: stats.data.audio_features.map((song) => 
          song.instrumentalness)
          },
        {
          attribute: "Danceability", 
          value:stats.data.audio_features.map((song) => 
            song.danceability)
          },
          {
            attribute: "Energy", 
            value: stats.data.audio_features.map((song) => 
            song.energy)
            },
                  {
                    attribute: "Speechiness", 
                    value: stats.data.audio_features.map((song) => 
                    song.speechiness)
                    },
                    {
                      attribute: "Liveness", 
                      value: stats.data.audio_features.map((song) => 
                      song.liveness)
                      },
                    
                      {
                        attribute: "Valence", 
                        value: stats.data.audio_features.map((song) => 
                        song.valence)
                        }
    ]
    const indData = [
      {
        attribute: "Tempo", 
        value: stats.data.audio_features.map((song) => 
        song.tempo)
        },
        {
          attribute: "Loudness", 
          value: stats.data.audio_features.map((song) => 
          song.loudness )
          }
      
    ]
    function getAverageThing(array) {
      // Check if the array is empty or contains only zeros
      if (array.length === 0 ) {
          return 0;
      }
      return array.reduce((acc, val) => acc + val, 0) / array.length;
  }

    useEffect(() => {
      const indDataAverages = indData.map(item2 => ({
        attribute: item2.attribute,
        value: item2.value,
        average: getAverageThing(item2.value).toFixed(2)
    }));
    setIndStat(indDataAverages);
    }, [])
  
    useEffect(() => {
      const dataWithAverages = data.map(item => ({
          attribute: item.attribute,
          value: item.value,
          average: getAverageThing(item.value)
      }));
      setAverageStat(dataWithAverages);  
  }, []);

      // console.log("averagesssss",averageStat)
      // console.log("indStat",indStat)
      // console.log("acoustic", data)
  return (

    
    <div className="w-full h-[35vh] mt-5 justify-center">
      {stats && indStat? ( <>
        <p className="text-center mb-3 text-xl">Your top song analysis</p>
        <p className="text-center mb-3 text-l"> Average Tempo: {indStat[0]?.average} BPM</p>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="90%" data={averageStat}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" />
            <PolarRadiusAxis />
            <Radar name="Mike" dataKey="average" stroke="#43ff64d9" fill="#004a06" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        </>
      ) : null}
      

    </div>
  )
}

export default TopSongsAnalysis