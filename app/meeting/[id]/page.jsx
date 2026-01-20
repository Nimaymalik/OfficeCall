"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import StreamProvider from "@/app/components/stream-provider";
import {
    StreamTheme,
    Call,
    CallControls,
    SpeakerLayout,
} from "@stream-io/video-react-sdk";
import MeetingRoom from "@/app/components/meeting-room";

const Meetingpage = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const router = useRouter();

    const callId = params.id;
    const name = searchParams.get("name") || "Guest";

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    // Create user
    useEffect(() => {
        setUser({
            id: name.toLowerCase().replace(/\s+/g, "-"),
            name,
        });
    }, [name]);

    // Fetch token
    useEffect(() => {
        if (!user) return;

        const getToken = async () => {
            try {
                const res = await fetch("/api/token", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user.id,
                        callId,
                    }),
                });

                const data = await res.json();
                if (!data.token) throw new Error("No token returned");

                setToken(data.token);
            } catch (err) {
                setError(err.message);
            }
        };

        getToken();
    }, [user, callId]);

    // Error UI
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="p-6 bg-red-900/20 border border-red-500 rounded-lg">
                    <p className="text-red-500 font-bold text-lg mb-2">Error</p>
                    <p>{error}</p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    // Loading UI
    if (!token || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto" />
                    <p className="mt-4 text-lg">Connecting...</p>
                </div>
            </div>
        );
    }

    const hanldeLeave = () => {
        router.push("/");
    }


    // Meeting UI
    return (
        <StreamProvider user={user} token={token}>
            <StreamTheme>
                <MeetingRoom callId={callId} onLeave={hanldeLeave} userId={user.id} />
            </StreamTheme>
        </StreamProvider>
    );
};

export default Meetingpage;
