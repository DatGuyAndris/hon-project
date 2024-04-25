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
    <div className='col-span-2 w-5/6'>
    {session?.accessToken? (
    
    <div > <SpotifyWebPlayer
            
            token={session.accessToken}
            uris={playThisUri}
            showSaveIcon
            syncExternalDevice
            persistDeviceSelection
            
            
            styles = {{
              bgColor: "#3333"
            }}
            /> </div>) : null}
    
            </div>
  )
}

export default PlayRecommended