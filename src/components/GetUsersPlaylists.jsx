'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import TopGenresChart from './TopGenresChart';
import ArtistPopularityChart from './ArtistPopularityChart';
import TopSongsAnalysis from './TopSongsAnalysis';
import TopAlbums from './TopAlbums';
import { db } from '@/lib/firebase';
import { addDoc, collection,getDocs,query,where} from 'firebase/firestore';


const GetUsersPlaylists = () => {

    const{data:session} = useSession()
    const {data:playlists} = useQuery({
        queryKey:["playlists"],
        enabled:!!session,
        refetchOnWindowFocus: false,    
        queryFn:() => {
          
          return axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
        }
      })


      const noOfPlaylists = playlists?.data.items.length

      
          
        
      
    



      

  return (


    <div className='text-3xl'>
      <div> You have {noOfPlaylists} playlists</div>

      
      
    
    
    </div>
  )
}

export default GetUsersPlaylists