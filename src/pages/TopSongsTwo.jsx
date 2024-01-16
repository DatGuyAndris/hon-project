import { Inter } from 'next/font/google'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

const TopSongsTwo = () => {
    
    const{data:session} = useSession()
    const {data:myTopSongsData} = useQuery({
        queryKey:["myTopSongsQuery"],
        enabled:!!session,
        queryFn:() => {
          return axios.get("https://api.spotify.com/v1/me/top/tracks?limit=20", {
            headers: {
              Authorization: `Bearer ${session.accessToken}`
            }
          })
        }
      })
      

  return (
    <main>
    {myTopSongsData && myTopSongsData.data?.items ? (
      <div>Top Songs: {myTopSongsData.data?.items.map((topSong)=><div key={topSong.id}>{topSong.name} - {topSong.artists[0].name} </div>)}</div>
    ) : (null)}
    </main>
  )
}

export default TopSongsTwo