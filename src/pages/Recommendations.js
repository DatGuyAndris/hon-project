"use client";
import Image from "next/image";
import { Content, Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import RecentlyPlayedTracks from "../components/RecentlyPlayedTracks";

import Navbar from "../components/Navbar";
import Login from "../components/login";
import { signIn } from "next-auth/react";
import SpotifyWebPlayer from "react-spotify-web-playback";
import GetRecommendationsTopSongs from "@/components/GetRecommendationsTopSongs";
import Loginplease from "@/components/Loginplease";

export default function Recommendations() {
  const { data: session } = useSession();
  const [timeFrame, setTimeFrame] = useState("short_term");
  const [playThisUri, setPlayThisUri] = useState();

  return (
    <>
      {session ? (
        <main className="flex flex-col items-center w-full">
          <Navbar />
          {/* <div className="mt-50 w-full flex items-center">
        <GetCurrentSong />
      </div> */}
          <div className="w-5/6">
            {session?.accessToken && playThisUri ? (
              <div>
                {" "}
                <SpotifyWebPlayer
                  token={session.accessToken}
                  uris={playThisUri}
                  play
                  showSaveIcon
                  syncExternalDevice
                  persistDeviceSelection
                  styles={{
                    bgColor: "#3333",
                  }}
                />{" "}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-2 w-5/6 ">
            <RecentlyPlayedTracks
              setPlayThisUri={setPlayThisUri}
              playThisUri={playThisUri}
            />

            <div className="mt-20">
              <GetRecommendationsTopSongs
                setPlayThisUri={setPlayThisUri}
                playThisUri={playThisUri}
              />
            </div>
          </div>
        </main>
      ) : (
        <Loginplease />
      )}
    </>
  );
}
