import React from 'react'
import {useEffect, useState} from "react"
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const RecentlyPlayedTracks = () => {

  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [attributesTwo, setAttributesTwo] = useState([]);
  const { data: session } = useSession();


  useEffect(() => {
    // Getting the recently played tracks audio features, using for values for song recommendations 
    function hhh() {
      if (session && session.accessToken) {
        //setX(session.accessToken)

        const trackIds = recentlyPlayed.map((track) => track.track.id);
        const trackIdsString = trackIds.join(",");

        axios.get(`https://api.spotify.com/v1/audio-features`, {
            params: {
              ids: trackIdsString,
            },
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })
          .then((response) => {
            const data = response.data; // Use response.data instead of response.json()
            setAttributesTwo(data.audio_features);
            console.log("attributes", attributesTwo);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    hhh();
  }, [recentlyPlayed]);



  useEffect(() => {
    //Getting the recently played tracks 
    function h() {
      if (session && session.accessToken) {
        axios
          .get("https://api.spotify.com/v1/me/player/recently-played", {
            params: {
              limit: 20,
            },
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          })
          .then((response) => {
            // console.log(response);
            const data = response.data;
            setRecentlyPlayed(data.items);
            console.log("recentlyPlayed", recentlyPlayed);
          })
          .catch((error) => {
            console.error(error);
          });
        // setRecentlyPlayed(data.items);
      }
    }
    h();
  }, [session]);
  return (



    <div>RecentlyPlayedTracks
         <>{recentlyPlayed.map((recent)=><div key={recent.id}> {recent.track.name}</div>)}</> 
    </div>


  )
}

export default RecentlyPlayedTracks