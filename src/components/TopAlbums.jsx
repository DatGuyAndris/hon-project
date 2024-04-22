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