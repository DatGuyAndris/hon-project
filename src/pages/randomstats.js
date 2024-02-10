import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";

import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import Navbar from "../components/Navbar";

export default function OtherPage() {
  return (
    <main className="flex flex-col items-center">
      <Navbar />
      <div> Other things will be here</div>
    </main>
  );
}
