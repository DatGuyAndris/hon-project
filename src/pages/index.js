"use client";
import Image from "next/image";
import { Content, Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TimeNavBar from "../components/TimeNavBar";
import TopSongsAndArtists from "../components/TopSongsAndArtists";
//import { TestingDB } from "./TestingDB";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // The api call for top artists, refetch to change the params for selected time frame
  const [timeFrame, setTimeFrame] = useState("short_term");
  const { data: session } = useSession();

  return (
    <main className="flex flex-col w-full items-center sm:w-full">
      {/* <div>access token: {session?.accessToken} </div> */}

      <Navbar />

      <div className="mt-2 w-full">
        <TimeNavBar setTimeFrame={setTimeFrame} />
      </div>

      {session?.accessToken ? (
        <TopSongsAndArtists session={session} timeFrame={timeFrame} />
      ) : null}
    </main>
  );
}
