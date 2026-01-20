"use client"

import { StreamCall, useStreamVideoClient } from '@stream-io/video-react-sdk'
import React, { useEffect, useRef, useState } from 'react'

const MeetingRoom = ({callId,onLeave,userId}) => {
    const client = useStreamVideoClient();
    const [call, setCall] = useState(null)
    const [error, setError] = useState(null)

    const joinedRef=useRef(false);
    const leavingRef=useRef(false);

    const callType="default";

    useEffect(()=>{
        if(!client || joinedRef.current) return;

        joinedRef.current=true;

        const init=async()=>{
            try {
                const myCall=client.call(callType,callId);
                await myCall.get


                
            } catch (error) {
                
            }
        }


    },[client,callId,userId])

    if (error) {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      Error: {error}
    </div>
  );
}

if (!call) {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div>
        <div className="animate-spin h-16 w-16 border-t-4 border-blue-500 rounded-full" />
        <p className="mt-4 text-lg">Loading meeting...</p>
      </div>
    </div>
  );
}


    return (
        <StreamCall call={call}>
            Meeting Room

        </StreamCall>
    )
}

export default MeetingRoom