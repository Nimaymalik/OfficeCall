"use client"

import { name } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const [userName, setuserName] = useState("");
  const router = useRouter();

  const handleJoin = () => {
    const nameOfUser = userName.trim() === "" ? "Guest" : userName.trim();

    const meetingId = process.env.NEXT_PUBLIC_CALL_ID;

   return router.push(`meeting/${meetingId}?name=${encodeURIComponent(nameOfUser)}`)
  }
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-gray-900 to-gray-900 text-white">
      <div className="p-8 bg-gray-800/60 rounded-2xl border border-gray-700 w-80 shadow-2xl">
        <h2 className="text-xl fonr-semibold mb-4 text-center"> Enter your name</h2>

        <input type="text"
          className="px-4 py-3 w-full rounded-lg bg-gray-700/80 border border-gray-600 text-white "
          placeholder="E.g Nimay Malik"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />

        <button className="mt-5 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"

          onClick={handleJoin}
        >
          Join meeting
        </button>


      </div>
    </div>
  );
}
