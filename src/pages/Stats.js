"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import TestingDB from "@/components/TestingDB";

import GetUsersPlaylists from "@/components/GetUsersPlaylists";
import Loginplease from "@/components/Loginplease";

export default function Stats() {
  const { data: session } = useSession();
  return (
    <>
      {" "}
      {session ? (
        <main className="flex flex-col items-center">
          <Navbar />
          <div> Just random stats and graphs here about the users music</div>
          <div className="w-5/6">
            <TestingDB />
          </div>
          <div>
            <GetUsersPlaylists />
          </div>
        </main>
      ) : (
        <Loginplease />
      )}
    </>
  );
}
