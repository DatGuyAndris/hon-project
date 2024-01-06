
import Image from 'next/image'



export default function Home() {

//Code stuff here

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID
const REDIRECT_URI = "http://localhost:3000/hon2"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"
const SCOPE = "user-read-playback-state+user-modify-playback-state+user-read-currently-playing+app-remote-control+streaming+playlist-modify-public+user-read-playback-position+user-top-read+user-read-recently-played+user-library-modify+user-library-read"








  return (
    // Website stuff here
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href="/hon2">
      <button > Take to global page </button>
      </a>

      
      <a href = {`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} > Login to Spotify</a>
     
     
      <div className="text-green-500" >   AAAAAAAAfasfsdfsadfssadsadas2q4
      
      
       </div>
      

      
    </main>
  )
}
