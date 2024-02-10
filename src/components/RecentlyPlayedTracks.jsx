import React from 'react'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import GetRecommendations from './GetRecommendations'

const RecentlyPlayedTracks = () => {

  const { data: session } = useSession();

  const {data:myRecentSongsData} = useQuery({
    queryKey:["myRecentSongsQuery"],
    enabled:!!session,
    queryFn:() => {
      return axios.get("https://api.spotify.com/v1/me/player/recently-played", {
        params: {
          limit: 50,
                },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
                }
        })
      }
    })
    

        const {data:myRecentSongsAttributeData} = useQuery({
          queryKey:["myRecentSongsAttributeQuery"],
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
    console.log("recentlyplayed",myRecentSongsData)
  return (

    <main>
    {myRecentSongsData && myRecentSongsData.data?.items ? (
      <><div>Recent: {myRecentSongsData.data?.items.map((recent,index)=><div key={ recent.track.id + index}>{recent.track.name} - {recent.track.artists[0].name} </div> )}</div> <div className='mt-20'>
        <GetRecommendations songs={myRecentSongsData.data.items}/>  </div> </>
    ) : (null)}


    </main>


  )
}

export default RecentlyPlayedTracks