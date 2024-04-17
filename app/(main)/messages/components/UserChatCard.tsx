"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

export default function UserChatCard({ otherUser }: any) {
  const params = useParams();

  return (
    <div
      className={`flex p-3 rounded-xl gap-y-2 items-center gap-x-2 hover:bg-gray-sub-100 ${
        params.userId == otherUser.id && "bg-gray-200"
      }`}
    >
      <Image
        alt="logo"
        src={otherUser.imageUrl || "/avatar.png"}
        height={"200"}
        width={"200"}
        className="h-16 w-16 rounded-full"
      />
      <h1 className="text-xl font-semibold">{otherUser.firstName}</h1>
    </div>
  );
}
