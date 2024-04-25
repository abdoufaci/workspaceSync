"use client";

import { getChat } from "@/actions/mutations/chat-actions/getChat";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";

export default function ChatMessages({ chat, currentUser, chatPartner }: any) {
  const router = useRouter();
  const chatRef = useRef<ElementRef<"div">>(null);
  //const [chatMessages, setChatMessages] = useState(initialData.messages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chat?.id}`));
    console.log("subsribed to chatWebsocket");

    const messageHandler = () => {
      router.refresh();
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chat.id}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView(false);
  }, [chat]);

  return (
    <div className="flex flex-col" ref={chatRef}>
      {chat.messages.map((message: any) => (
        <div
          key={message.id}
          className={`flex px-4 py-2 gap-x-2 hover:bg-gray-200 ${
            currentUser?.id == message.fromId && "self-end flex-row-reverse"
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
                    <video width="320" height="240" controls preload="none">
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
                    <div className="text-lg text-white">{content.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
