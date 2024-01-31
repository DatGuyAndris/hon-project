"use client";
import Image from "next/image";
import { Content, Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import TopSongsTwo from "./TopSongsTwo";
import RecentlyPlayedTracks from "./RecentlyPlayedTracks";
import { useQuery } from "@tanstack/react-query";
import GetCurrentSong from "./GetCurrentSong";
import Navbar from "./Navbar";
import Login from "./login";
import { signIn } from "next-auth/react";
import TimeNavBar from "./TimeNavBar";

import TopSongsAndArtists from "./TopSongsAndArtists";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // The api call for top artists, refetch to change the params for selected time frame
  const [timeFrame, setTimeFrame] = useState("short_term");
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center">
      <div>access token: {session?.accessToken} </div>
      <Navbar />
      <div></div>
      <TimeNavBar setTimeFrame={setTimeFrame} />

      <div className="mt-20">
        <GetCurrentSong />
      </div>
      {session?.accessToken ? <TopSongsAndArtists /> : null}

      {/* <div className='mt-20'><TopSongsTwo/>  </div>  */}
      <div className="mt-20">
        <RecentlyPlayedTracks />
      </div>
    </main>
  );
}

// Custom tooltip when hovering over points in the popularity chart
