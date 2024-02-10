import React from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const GetRecommendations = ({songs}) => {

  const{data:session} = useSession()

  const seedTracks =  songs?.map((song) => song.track.id);
   const seedTrackIds = seedTracks.slice(0,3).join(",")


   const seedArtists = songs?.map((artist) => artist.track.artists[0].id);
   const seedArtistIds = seedArtists.slice(0,2).join(",")

  console.log(seedTrackIds)


  const {data:recSongsData, status, error} = useQuery({
      queryKey:["recSongsQuery",songs],
      enabled:!!session,
      queryFn:() => {
        const seedsongs = ""
        return axios.get("https://api.spotify.com/v1/recommendations", {
          params: {
            seed_tracks: seedTrackIds,
            seed_artists: seedArtistIds
            
           // seed_genres: "rap"

          },
          headers: {
            Authorization: `Bearer ${session.accessToken}`
          }
        })
      }
    })

    console.log("recommended:", recSongsData, status, error)

    
  return (
    <main className=''> 
    {recSongsData && recSongsData.data?.tracks ? (
      <div>Recommended songs: {recSongsData.data?.tracks.map((recSong)=><div key={"recommended_"+recSong.id} className=' bg-slate-700 w-96 h-full m-2 p-2 flex flex-col text-l'>{recSong.name} - {recSong.artists[0].name} </div>)}</div>
    ) : (null)}
    </main>
  )
}

export default GetRecommendations