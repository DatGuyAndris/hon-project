import React from 'react'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import GetRecommendations from './GetRecommendations'

const RecentlyPlayedTracks = ({setPlayThisUri, playThisUri}) => {

  const { data: session } = useSession();

   // function to get the average
   function getAverageThing(array) {
    // Check if the array is empty or contains only zeros
   // console.log("arrayForPopularity",array)
    if (array?.length === 0 ) {
        return 0;
    }
    return array?.reduce((acc, val) => acc + val, 0) / array?.length;
  }

  const {data:myRecentSongsData} = useQuery({
    queryKey:["myRecentSongsQuery"],
    enabled:!!session,
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        params: {
          limit: 40,
                },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
                }
        })
      }
    })

    const {data:myRecentSongsAttributeData} = useQuery({
      queryKey:["myRecentSongsAttributeQuery",myRecentSongsData],
      enabled:!!session?.accessToken,
      queryFn:() => {
        const trackIds = myRecentSongsData.data?.items.map((track) => track.track.id);
        const trackIdsString = trackIds.join(",");
        return axios.get(`https://api.spotify.com/v1/audio-features`, {
        params: {
          ids: trackIdsString,
          },
          headers: {
             Authorization: `Bearer ${session.accessToken}`,
           }
        })   
     }
    })
    //console.log("recentlyplayed",myRecentSongsAttributeData)


    const recentAttributes = [ 
      {
        attribute: "Danceability", 
        value: getAverageThing(myRecentSongsAttributeData?.data.audio_features.map((song) => 
          song.danceability)).toFixed(2)
        },
        {
          attribute: "Energy", 
          value: getAverageThing(myRecentSongsAttributeData?.data.audio_features.map((song) => 
          song.energy)).toFixed(2)
          },
        {
          attribute: "Valence", 
          value: getAverageThing(myRecentSongsAttributeData?.data.audio_features.map((song) => 
            song.valence)).toFixed(2)
          },
          {
            attribute: "Speech", 
            value: getAverageThing(myRecentSongsAttributeData?.data.audio_features.map((song) => 
              song.speechiness)).toFixed(2)
            }]

   
      
            //console.log("recentatrii",recentAttributes)

  return (

    <main className='w-5/6 '>
    {myRecentSongsData && myRecentSongsData.data?.items ? (
      <><div className='mt-20 w-full '>
      <GetRecommendations songs={myRecentSongsData.data.items} recentAttributes = {recentAttributes} setPlayThisUri={setPlayThisUri} playThisUri ={playThisUri}/>  </div>
      {/* <div>Recent: {myRecentSongsData.data?.items.map((recent,index)=><div key={ recent.track.id + index}>{recent.track.name} - {recent.track.artists[0].name} </div> )}</div>  */}
       </>
    ) : (null)}


    </main>


  )
}

export default RecentlyPlayedTracks