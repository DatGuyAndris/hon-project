"use client"
import React from 'react'
import axios from 'axios'
export default function  MyTopArtists(token) {

    const searchMyTopArtists = async (e) => {
        const {data:myTopItems} = await axios.get("https://api.spotify.com/v1/me/top/artists?limit=0&offset=0",{
         headers: {
          Authorization:`Bearer ${token}`
        //  }
        //  ,
        //    params: {
        //    type: "artists",
        //    time_range: "medium_term",
        //    limit: 30
         }
    
         })
    
        console.log(myTopItems)
      }
  return ( <div>{searchMyTopArtists()}</div>  );
}
 