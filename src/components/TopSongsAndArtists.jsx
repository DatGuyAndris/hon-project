'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
  } from "recharts";
import TopGenresChart from './TopGenresChart';
import ArtistPopularityChart from './ArtistPopularityChart';

const TopSongsAndArtists = ({timeFrame, session}) => {

    
  
  // Top Artists API call, sets timeFrame from TimeNavBar
    const {
      data: myTopArtistData,
      status,
      refetch,
    } = useQuery({
      queryKey: ["myTopArtistQuery"],
      enabled: !!session,
      queryFn: () => {
        return axios.get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          params: {
            limit: 40,
            time_range: timeFrame
          },
        });
      },
    });
    // Top Songs API call, sets timeFrame from TimeNavBar
    const {
      data: myTopSongsData,
      refetch: ts,
      error,
    } = useQuery({
      queryKey: ["myTopSongsQuery"],
      enabled: !!session,
      queryFn: () => {
        return axios.get("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          params: {
            limit: 40,
            time_range: timeFrame
          },
        });
      },
    });

    // Get song attributes for top songs
    const {
      data:myTopSongsAttributeData,
      refetch: tsa,
      error:atterror
    } = useQuery({
      queryKey:["myTopSongsAttributeQuery"],
      enabled:!!session,
      queryFn:() => {
        const topTrackIds = myTopSongsData?.data.items.map((topTrack) => topTrack.id);
        const topTrackIdsString = topTrackIds?.join(",");
        console.log("SongAttributes", topTrackIds)
        return axios.get(`https://api.spotify.com/v1/audio-features`, {
        params: {
          ids: topTrackIdsString,
        },
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        }
      })   
 }  
})
console.log("topSongAttributes", myTopSongsAttributeData,atterror)
  
    console.log("topArtists", myTopArtistData);
    console.log("topSongs", myTopSongsData, error);
    console.log(status);
  
    useEffect(() => {
      refetch(), ts(), tsa();
    }, [timeFrame]);
    
  return (



    <div className='w-5/6 flex flex-col '>
    {/*Displaying the data from both api calls and a graph of top artist popularity  -- - - - - - - -  */}

    {/*  Displaying top artists if there is top artist data     */}

    {myTopArtistData && myTopArtistData.data?.items ? (
        <>
        <p className='text-center text-2xl mt-5 '> Top Artists</p> 
          <div className="overflow-y-hidden flex h-72 justify-stretch w-full">
            
            
            {myTopArtistData.data.items.map((topArtist, index) => (
              <div key={"topArtist_" + topArtist.id} className=' bg-slate-700 w-96 h-full m-2 p-2 flex flex-col-reverse scrollbar' >
                <img className='w-44 h-48 object-cover'
                  src={topArtist.images[0].url}
                  // width="100%"
                  // height="100%"
                ></img>
                <p className='w-44 h-full' >{index+1}.{topArtist.name}</p>
                
              </div>
            ))}
          </div>
          <p className='text-center text-2xl mt-5 '> Top Songs</p> 
    {/*  Displaying top songs if there is top song data     */}
          {myTopSongsData && myTopSongsData.data?.items ? (
            <div className='overflow-y-hidden flex h-72 justify-stretch w-full' >
             
              {myTopSongsData.data.items.map((topSong) => (
                <div key={"topSongs_" + topSong.id} className=' bg-slate-700 w-96 h-full m-2 p-2 flex flex-col-reverse' >
                  <p className='w-44 h-full'> {topSong.name} - {topSong.artists[0].name} </p>
                  <img
                  src={topSong.album.images[0].url}
                // width="100%"
                // height="100%"
                className='w-full h-full'
                ></img>
                 
                </div>
              ))}
            </div>
          ) : null}
        
        
          {/* The popularity chart  - - -  Commented out cause not needed at the moment*/}
          {/* <div className="w-full h-96">
            <ResponsiveContainer>
              <LineChart
                //width={1400}
                //height={400}
                data={myTopArtistData.data.items.map((topArtist2, index) => ({
                  name: topArtist2.name,
                  popularity: topArtist2.popularity,
                  rank: index,
                  imgsrc: topArtist2.images[0].url,
                }))}
                margin={{
                  top: 5,
                  right: 10,
                  left: 10,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="popularity"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div> */}
        </>
      ) : null}

      {/* If there is topArtistData set export the data to the other pages that use it */}
      {myTopArtistData? (
      <div  className="w-3/4 h-96">
        <TopGenresChart topArtists = {myTopArtistData}/> 
       <ArtistPopularityChart topArtistsData = {myTopArtistData}/></div> ) : null}
      </div> 
      
    
  )
}

export default TopSongsAndArtists







// - - - - -- - - -- - - - - - - - -  Custom tooltip when hovering over points in the popularity chart - - - - -- - - -- - - - - - - - - 
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip flex flex-col items-center justify-center">
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{getIntroOfPage(label)}</p> */}
  
          <p className="text-2xl">{`${label}`}</p>
          <img
            src={payload[0].payload.imgsrc}
            width="30%"
            height="30%"
            className="rounded-md"
          ></img>
          <p className="label">{`Popularity : ${payload[0].payload.popularity}`}</p>
          <p className="label">{`Your #${payload[0].payload.rank + 1} Artist`}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      );
    }
  
    return null;
  };