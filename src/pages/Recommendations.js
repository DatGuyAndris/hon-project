"use client";
import Image from "next/image";
import { Content, Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import RecentlyPlayedTracks from "../components/RecentlyPlayedTracks";
import { useQuery } from "@tanstack/react-query";
import GetCurrentSong from "../components/GetCurrentSong";
import Navbar from "../components/Navbar";
import Login from "../components/login";
import { signIn } from "next-auth/react";
import TimeNavBar from "../components/TimeNavBar";
import TopSongsAndArtists from "../components/TopSongsAndArtists";
import ArtistPopularityChart from "@/components/ArtistPopularityChart";
import GetRecommendations from "@/components/GetRecommendations";

export default function Recommendations() {
  const { data: session } = useSession();
  const [timeFrame, setTimeFrame] = useState("short_term");

  return (
    <main className="flex flex-col items-center w-full">
      <div>access token: {session?.accessToken} </div>
      <Navbar />
      <div className="mt-20">
        <GetCurrentSong />
      </div>

      <div> Other things will be here toooo</div>

      <div className="mt-20">
        Recommendations based on your top artists and songs, probably use short
        term data
      </div>
      <div className="">
        <RecentlyPlayedTracks />
      </div>

      <div className="mt-20">
        If recently played songs skipped a lot, recommend a different genre
        maybe? If difference from prev song timestamp to next song timestamp
        less than song duration count as skipped
      </div>

      <div className="mt-20">
        Something like if raining, give option of keeping normal recommended or
        recommend more relaxing music or something like that for different
        weather
      </div>
    </main>
  );
}
