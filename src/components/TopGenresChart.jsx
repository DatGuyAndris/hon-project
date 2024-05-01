"use client";
import { Tooltip } from "chart.js";
import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const TopGenresChart = ({ topArtists: data }) => {
  const [genresState, setGenresState] = useState({});



// Maps through genres, if first time seeing genre, add it to new list, if not first time increase count 
useEffect(() => {
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
      if (!genreExists) {
        updatedGenres.push({ genre: genre, count: 1 });
      }
    });
  });

  //sort and limit the list to top 10 genres
  updatedGenres.sort((a, b) => b.count - a.count);
  const topGenres = updatedGenres.slice(0,10);
  setGenresState(topGenres);
}, [data]);
 // console.log("gsss",genresState)

  return (
    <div className="w-full h-[30vh] min-h-[20vh] max-h-[40vh] mt-3 ml-3 justify-center ">
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
