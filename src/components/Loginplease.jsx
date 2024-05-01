import React from 'react'
import {signIn,signOut} from "next-auth/react"
import Link from 'next/link';
import { useSession } from "next-auth/react";



const Loginplease = () => {


  return (


    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-green-900 to-neutral-950 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-bold tracking-tight sm:text-[5rem]">
          SpotiFind
        </h1>
        <button onClick={()=>signIn('spotify', {callbackUrl: "/"})} className='bg-green-800 p-4 text-xl rounded-md'> Login with Spotify</button>
      </div>
    </main>
  )
}

export default Loginplease