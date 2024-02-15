import React from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'



const GetRecOnTime = () => {

    const{data:session} = useSession()





  return (


    <div>GetRecOnTime
        <p></p>
    </div>
    
  )
}

export default GetRecOnTime