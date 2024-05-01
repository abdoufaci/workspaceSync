"use client";

import { Video, VideoOff } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export default function ChatVideoButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isVideo = searchParams.get("video");

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: {
          video: isVideo ? undefined : true,
        },
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <>
      {isVideo ? (
        <VideoOff
          className="w-6 h-6 text-black/70"
          role="button"
          onClick={onClick}
        />
      ) : (
        <Video
          className="w-6 h-6 text-black/70"
          role="button"
          onClick={onClick}
        />
      )}
    </>
  );
}
