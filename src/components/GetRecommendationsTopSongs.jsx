
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { PlayIcon,PauseIcon,QueueListIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
const GetRecommendationsTopSongs = () => {

  const {
    data: topSongsforRec,
    status,
    refetch,
  } = useQuery({
    queryKey: ["myTopArtistQuery"],
    enabled: !!session,
    queryFn: () => {
      return axios.get("https://api.spotify.com/v1/me/top/artists", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        params: {
          limit: 40,
          time_range: timeFrame
        },
      });
    },
  });




  

  return (


    
    <div>GetRecommendationsTopSongs</div>
  )
}

export default GetRecommendationsTopSongs