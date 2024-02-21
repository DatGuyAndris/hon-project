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
            seed_artists: seedArtistIds,
            max_popularity: 50
            
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
    <div className='grid-cols-2'> 
    {recSongsData && recSongsData.data?.tracks ? (
      <div className='w-full grid-cols-2 text-neutral-200 py-2'> Recommended
      
        {recSongsData.data?.tracks.map((recSong)=>
          <div key={"recommended_"+recSong.id} className='flex items-center grid-rows-2 space-x-4 bg-neutral-800 mt-2 text-l w-full'>
            <img
                src={recSong.album.images[0].url}
                className='w-20 h-20'
                ></img>
                <div className='w-5/6'>
           <p className='text-xl'>{recSong.name} </p>  
           <p>{recSong.artists[0].name}</p>
           
           </div>
           <div className='w-52'> <p className='text-right mr-3'>button </p></div>
             </div>)}

      </div> ) : (null)}
    </div>
  )
}

export default GetRecommendations