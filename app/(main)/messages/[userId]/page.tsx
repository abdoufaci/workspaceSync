import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatInput from "../components/ChatInput";
import { revalidatePath } from "next/cache";

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

  const otherUser =
    params.userId == chat?.users[0].id ? chat?.users[0] : chat?.users[1];

  return (
    <div className="flex h-full">
      <div className="flex flex-col h-full w-2/3">
        <div className="w-full p-3 flex gap-x-4 border-b items-center">
          <Image
            alt="logo"
            src={otherUser?.imageUrl || "/avatar.png"}
            height={"200"}
            width={"200"}
            className="h-16 w-16 rounded-xl"
          />
          <h1 className="text-2xl font-semibold">{otherUser?.firstName}</h1>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {chat?.messages.map((message: any) => (
              <div
                key={message.id}
                className={`flex px-4 py-2 gap-x-2 hover:bg-gray-200 ${
                  currentUser?.id == message.fromId &&
                  "self-end flex-row-reverse"
                }`}
              >
                <div className="flex flex-col gap-y-1">
                  <div className="bg-blue-400 font-light rounded-2xl px-4 py-2">
                    {message.contents.map((content: any) => (
                      <div
                        className="flex max-w-[300px] items-center m-[2px] rounded-md"
                        key={content.id}
                      >
                        {content.type == "image" ? (
                          <Image
                            alt="media image"
                            src={content.content}
                            width={1000}
                            height={1000}
                            className="rounded-md object-fill"
                          />
                        ) : content.type == "video" ? (
                          <video
                            width="320"
                            height="240"
                            controls
                            preload="none"
                          >
                            <source src={content.content} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : content.type == "pdf" ? (
                          <Link
                            target="_blank"
                            href={content.content}
                            className="flex justify-center items-center gap-x-1 w-full px-2 h-[70px] bg-[#c61a0e] text-[#eee3e4] rounded-xl"
                          >
                            <File />
                            {content.name}
                          </Link>
                        ) : content.type == "audio" ? (
                          <audio controls src={content.content}></audio>
                        ) : (
                          <div className="text-lg text-white">
                            {content.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="px-6 pb-4 pt-2">
          <ChatInput userId={currentUser?.id} chatId={chat?.id} />
        </div>
      </div>
      <div className="h-full w-1/3 border-l p-4 flex flex-col gap-y-2"></div>
    </div>
  );
}
