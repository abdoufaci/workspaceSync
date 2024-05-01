"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function UserChatCard({ otherUser }: any) {
  const params = useParams();

  return (
    <div
      className={`flex p-2 rounded-xl items-center gap-x-2 hover:bg-gray-sub-100 ${
        params.userId == otherUser.id && "bg-gray-200"
      }`}
    >
      <Image
        alt="logo"
        src={otherUser.imageUrl || "/avatar.png"}
        height={"200"}
        width={"200"}
        className="h-12 w-12 rounded-full"
      />
      <div>
        <h1 className="text-sm font-semibold">{otherUser.firstName}</h1>
        {otherUser.role == "MANAGER" && (
          <Badge className="bg-[#ffbf00] hover:bg-[#ffbf00]">Manager</Badge>
        )}
      </div>
    </div>
  );
}
