"use client";
import { Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const TopGenresChart = ({ topArtists: data }) => {
  const [genresState, setGenresState] = useState({});
console.log("dataaaa",data)
  useEffect(() => {
    // map over items of data add genre title to the genresStuff object and add count as another key
    let updatedGenres = [];
    data.data.items?.map((item) => {
      item.genres.map((genre) => {
        
      
        let genreExists = false;
        updatedGenres.map((genreStuff) => {
          if (genreStuff.genre === genre) {
            genreExists = true;
            genreStuff.count++;
          }
        });
        if (!genreExists && updatedGenres.length < 10) {
          updatedGenres.push({ genre: genre, count: 1 });
        }
      });
    });

    setGenresState(updatedGenres);
  }, [data]);

  return (
    <div className="w-full h-[35vh] mt-3 justify-center">
      <p className="text-center mb-3 text-xl">Your top artist genres</p>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={genresState}>
          <PolarGrid />
          <PolarAngleAxis dataKey="genre" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="count" stroke="#43ff64d9" fill="#004a06" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopGenresChart;
