"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import TestingDB from "@/components/TestingDB";

export default function Stats() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <div> Just random stats and graphs here about the users music</div>
      <div>
        <TestingDB />
      </div>
    </main>
  );
}
