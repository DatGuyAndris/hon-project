import React from 'react'
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

        const albumTitles = songslist[0].albumTitle;

// Count occurrences of each album title
        const albumTitleCounts = {};
        albumTitles.forEach(title => {
        albumTitleCounts[title] = (albumTitleCounts[title] || 0) + 1;
});

// Output the counts
console.log("coubt",albumTitleCounts);

       
        console.log("songslist",songslist)
    }, [topSongsAlbums])

    



  return (



    <div>TopAlbums</div>
  )
}

export default TopAlbums