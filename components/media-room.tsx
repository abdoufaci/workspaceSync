"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";

export default function MediaRoom({ chatId, currentUser }: any) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const call = async () => {
      const resp = await fetch(
        `/api/livekit?room=${chatId}&username=${currentUser.username}`
      );
      const data = await resp.json();
      setToken(data.token);
    };

    call();
  }, []);

  if (!token) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <Loader2 className="h-6 w-6 animate-spin" />
        <p>Loading</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      connect={true}
      token={token}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
