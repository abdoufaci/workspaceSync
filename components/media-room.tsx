"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";

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
    return <p>Loading...</p>;
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
