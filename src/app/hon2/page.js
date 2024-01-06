"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'
import MyTopArtists from './components/MyTopArtists'

export default function Home() {


  const [token, setToken] = useState("")
  const [searchArtistKey, setSearchArtistKey] = useState("")
  const [artists, setArtists] = useState([])

  // the access token and hash stuff
  useEffect(()=> {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
  
    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
      window.location.hash = ""
      window.localStorage.setItem("token",token)
      
    }
    setToken(token)
  },[])
// log out 
  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

//Search artists
  const searchArtists = async (e) => {
    e.preventDefault()
    const {data:spartists} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q:searchArtistKey,
        type: "artist"
      } 

    })
    console.log(spartists)
    setArtists(spartists.artists.items)
  }
// - - - - - - 

  // renders the searched artist
  const renderSpartists = () => {
    return artists.map(artist => (
      <div  key={artist.id}>
      {artist.images.length ? <img width={"50%"} src={artist.images[0].url} alt="" /> : <div> No Image </div>} 
      {artist.name}
  
      </div>
    ))
  }




  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>AAAAAAAAfasfsdfsadfs</p>
      <p>This is where fancy data will go </p>

      <form onSubmit={searchArtists}> 
        <input type="text" className="text-purple-500" onChange={e => setSearchArtistKey(e.target.value)}/> 
      <button type={"submit"}> Search </button>
      </form>

      {/* <div> {renderSpartists()}</div> */}
      {/* <MyTopArtists token={token}/> */}
      


      <a href="http://localhost:3000"> <button onClick={logout}> Logout </button> </a>
    </main>
  )
}
