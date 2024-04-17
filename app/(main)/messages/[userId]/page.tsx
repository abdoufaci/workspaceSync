import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatInput from "../components/ChatInput";
import { revalidatePath } from "next/cache";
import ChatMessages from "../components/ChatMessages";
import { pusherClient, pusherServer } from "@/lib/pusher";

export default async function page({ params }: { params: { userId: string } }) {
  const currentUser = await getCurrentUser();

  let chat: any = await db.chat.findFirst({
    where: {
      users: {
        every: {
          OR: [{ id: params.userId }, { id: currentUser?.id }],
        },
      },
    },
    include: {
      users: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          username: true,
          imageUrl: true,
        },
      },
      messages: {
        include: {
          contents: true,
        },
      },
    },
  });

  if (!chat) {
    chat = await db.chat.create({
      data: {
        users: {
          connect: [{ id: currentUser?.id }, { id: params.userId }],
        },
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            imageUrl: true,
          },
        },
        messages: {
          include: {
            contents: true,
          },
        },
      },
    });

    revalidatePath("/messages");
  }

  const chatPartner =
    params.userId == chat?.users[0].id ? chat?.users[0] : chat?.users[1];

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full w-2/3">
        <div className="w-full p-3 flex gap-x-4 border-b items-center">
          <Image
            alt="logo"
            src={chatPartner?.imageUrl || "/avatar.png"}
            height={"200"}
            width={"200"}
            className="h-16 w-16 rounded-full"
          />
          <h1 className="text-2xl font-semibold">{chatPartner?.firstName}</h1>
        </div>
        <ScrollArea className="flex-1">
          <ChatMessages
            chat={chat}
            currentUser={currentUser}
            chatPartner={chatPartner}
          />
        </ScrollArea>
        <div className="px-6 pb-4 pt-2">
          <ChatInput userId={currentUser?.id} chatId={chat?.id} />
        </div>
      </div>
      <div className="h-full w-1/3 border-l p-4 flex flex-col gap-y-2"></div>
    </div>
  );
}
