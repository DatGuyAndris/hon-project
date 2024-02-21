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
    <div className="w-3/4 h-96 mt-10">
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="90%" data={genresState}>
          <PolarGrid />
          <PolarAngleAxis dataKey="genre" />
          <PolarRadiusAxis />
          <Radar name="Mike" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopGenresChart;
