"use client";

import { useRef, useState } from "react";

export default function VideoPlayer({ content }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const onVideoPress = () => {
    videoRef?.current?.play();
    setPlaying(true);
  };

  return (
    <div className="relative" onClick={onVideoPress}>
      {!playing && (
        <button className="absolute right-[calc(50%-24px)] top-[calc(50%-24px)] z-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12 p-2 pl-3 rounded-full bg-gray-sub-300/50"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      <video
        controls={playing}
        loop
        ref={videoRef}
        src={content}
        width="320"
        height="240"
        className="rounded-2xl cursor-pointer z-0"
      />
    </div>
  );
}
