import React , { PureComponent } from 'react'
import { Treemap, ResponsiveContainer } from 'recharts';
import TopSongsAndArtists from './TopSongsAndArtists'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';

const TopAlbums = ({topSongsAlbums}) => {

    const [countAlbums, setCountAlbums] = useState({})

    console.log("topalbums", topSongsAlbums)

    useEffect(() => {

       const songslist = [
            {
                songTitle: topSongsAlbums?.data.items.map((song) => song.name),
                albumTitle: topSongsAlbums?.data.items.map((song) => song.album.name),
                albumImage: topSongsAlbums?.data.items.map((song) => song.album.images[0].url)
            }    
        ]

        const albumTitles = songslist[0].albumImage;

// Count occurrences of each album title
        const albumTitleCounts = {};
        albumTitles.forEach(title => {
        albumTitleCounts[title] = (albumTitleCounts[title] || 0) + 1;
});

const albumTitleCountsArray = Object.entries(albumTitleCounts).map(([title, count]) => ({
  title,
  count
}));

console.log(albumTitleCountsArray);

setCountAlbums(albumTitleCountsArray)
// Output the counts
console.log("coubt",countAlbums);

      
    }, [topSongsAlbums])

    const data = [
      {
        name: 'axis',
        children: [
          { name: 'Axes', size: 1302 },
          { name: 'Axis', size: 24593 },
          { name: 'AxisGridLine', size: 652 },
          { name: 'AxisLabel', size: 636 },
          { name: 'CartesianAxes', size: 6703 },
        ],
      },
      {
        name: 'controls',
        children: [
          { name: 'AnchorControl', size: 2138 },
          { name: 'ClickControl', size: 3824 },
          { name: 'Control', size: 1353 },
          { name: 'ControlList', size: 4665 },
          { name: 'DragControl', size: 2649 },
          { name: 'ExpandControl', size: 2832 },
          { name: 'HoverControl', size: 4896 },
          { name: 'IControl', size: 763 },
          { name: 'PanZoomControl', size: 5222 },
          { name: 'SelectionControl', size: 7862 },
          { name: 'TooltipControl', size: 8435 },
        ]}]
    

  return (


        
    <div>
       
        <Treemap width={400}
         height={200} 
         data={countAlbums} 
         dataKey="count"
          aspectRatio={4 / 3} 
          stroke="#fff" 
          fill="title" />
      
      
  
  </div>
  )
}

export default TopAlbums