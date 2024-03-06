import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import SpotifyWebPlayer from 'react-spotify-web-playback'
import GetRecommendations from './GetRecommendations'

const PlayRecommended = ({playThisUri}) => {


    const{data:session} = useSession()
    const playThisSong = <GetRecommendations playThisUri/>



  return (


    <div> <SpotifyWebPlayer
            
            token={session.accessToken}
            uris={playThisUri ? [playThisUri] : []}
            showSaveIcon
            
            /> </div>
  )
}

export default PlayRecommended