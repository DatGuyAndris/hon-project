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

const TopSongsAndArtists = ({timeFrame}) => {

    
    const { data: session } = useSession();
  
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
            time_range: timeFrame,
          },
        });
      },
    });
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
            limit: 10,
            time_range: timeFrame,
          },
        });
      },
    });
  
    console.log("topArtists", myTopArtistData);
    console.log("topSongs", myTopSongsData, error);
    console.log(status);
  
    useEffect(() => {
      refetch(), ts();
    }, [timeFrame]);
  return (
    <div>
    {/* Top Artists graph, checks for data first then displays it  */}
    {myTopArtistData && myTopArtistData.data?.items ? (
        <>
          <div className=" grid grid-cols-2  content-start mt-20 max-h-96 overflow-y-auto">
            {myTopArtistData.data.items.map((topArtist) => (
              <div key={"topArtist_" + topArtist.id}>
                {topArtist.name}- Popularity: {topArtist.popularity}
                <img
                  src={topArtist.images[0].url}
                  width="30%"
                  height="30%"
                ></img>
              </div>
            ))}
          </div>

          {myTopSongsData && myTopSongsData.data?.items ? (
            <div>
              Top Songs:
              {myTopSongsData.data.items.map((topSong) => (
                <div key={"topSongs_" + topSong.id}>
                  {topSong.name} - {topSong.artists[0].name}
                </div>
              ))}
            </div>
          ) : null}

          {/* The chart itself */}
          <div className="w-3/4 h-96">
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

                {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
                <Line
                  type="monotone"
                  dataKey="popularity"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : null}
      </div>
  )
}

export default TopSongsAndArtists


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