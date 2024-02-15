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
//import { TestingDB } from "./TestingDB";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // The api call for top artists, refetch to change the params for selected time frame
  const [timeFrame, setTimeFrame] = useState("short_term");
  const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center">
      <div>access token: {session?.accessToken} </div>

      <Navbar />

      <div className="mt-5 w-full">
        <TimeNavBar setTimeFrame={setTimeFrame} />
      </div>

      {session?.accessToken ? (
        <TopSongsAndArtists session={session} timeFrame={timeFrame} />
      ) : null}

      {/* <div className="mt-20">
        <RecentlyPlayedTracks />
      </div> */}

      {/* <div className="mt-20">
        <GetCurrentSong />
      </div> */}

      {/* <ArtistPopularityChart /> */}

      {/* <TestingDB  /> */}
    </main>
  );
}
