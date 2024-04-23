import React , { PureComponent } from 'react'
import { Treemap, Cell,ResponsiveContainer, Tooltip } from 'recharts';
import TopSongsAndArtists from './TopSongsAndArtists'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const TopAlbums = ({topSongsAlbums}) => {

    const [countAlbums, setCountAlbums] = useState({})

    console.log("topalbums", topSongsAlbums)

    useEffect(() => {
      if (topSongsAlbums && topSongsAlbums.data && topSongsAlbums.data.items) {
        const albumTitles = topSongsAlbums.data.items.map(song => song.album.name);
  
        
        const albumTitleCounts = albumTitles.reduce((acc, title) => {
          acc[title] = (acc[title] || 0) + 1;
          return acc;
        }, {});
  
        const albumTitleCountsArray = Object.entries(albumTitleCounts).map(([name, size]) => {
          const image = topSongsAlbums.data.items.find(song => song.album.name === name)?.album.images[0]?.url;
          return {
            name: name + " - " + size + " Song(s)  ",
            size,
            image
          };
        });
  
        setCountAlbums(albumTitleCountsArray);
      }
    }, [topSongsAlbums]);

    
    console.log("easdas", countAlbums)
  return (


        
        
    <div className="h-96 w-full mt-20 block items-center">
    <p>Most common albums</p>
       <ResponsiveContainer>
       <Treemap
       
        data={countAlbums} 
        dataKey="size"
        aspectRatio={16 / 4}
        stroke="#fff"
        fill="#004a06">
        <Tooltip content={<CustomTooltip />}/>
        <Cell
                        fill={(entry) => entry.payload.image}
                        stroke="#fff"
                    />
        </Treemap>
       
        
      
      </ResponsiveContainer>
  
  </div>
  )
}

export default TopAlbums


const CustomTooltip = ({ active, payload, label }) => {
  console.log("payload", payload)
  if (active && payload && payload.length) {
    return (
      <div className="treemap-custom-tooltip bg-slate-300 rounded-md text-black p-2 w-max flex flex-row">
        
        <img
          src={payload[0].payload.image}
          width="30%"
          height="30%"
          className="rounded-md"
        ></img>
        <p>{`${payload[0].payload.name}`}</p>
        {/* <p>{`${payload[0].payload.name} : ${payload[0].value}`}</p> */}
      </div>
    );
  }

  return null;
};