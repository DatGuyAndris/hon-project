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
        <main className="flex flex-col items-center w-full">
          <Navbar />

          <div className="w-5/6 ">
            <p className="w-full text-center text-2xl my-5 bg-gradient-to-r from-transparent via-neutral-800">
              Current top 10 artists overtime rankings
            </p>
            <TestingDB />{" "}
          </div>

          <div className="w-5/6 ">
            <GetUsersPlaylists />
          </div>
        </main>
      ) : (
        <Loginplease />
      )}
    </>
  );
}
