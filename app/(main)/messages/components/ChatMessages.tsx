"use client";

import { getChat } from "@/actions/mutations/chat-actions/getChat";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { File, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import FileMessage from "./FileMessage";
import VideoPlayer from "./VideoPlayer";
import ImageMessage from "./ImageMessage";

export default function ChatMessages({ chat, currentUser }: any) {
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
          className={`flex px-4 py-2 gap-x-2 w-full ${
            currentUser?.id == message.fromId && "self-end flex-row-reverse"
          }`}
        >
          <div className="flex flex-col gap-y-1">
            <div
              className={`bg-blue-400 rounded-2xl border-2 border-blue-400 w-fit ${
                currentUser?.id == message.fromId && "self-end"
              }`}
            >
              {message.contents.map((content: any) => (
                <div
                  className="flex max-w-[300px] items-center w-fit"
                  key={content.id}
                >
                  {content.type == "image" ? (
                    <ImageMessage content={content.content} />
                  ) : content.type == "video" ? (
                    <VideoPlayer content={content.content} />
                  ) : content.type == "pdf" ? (
                    <FileMessage
                      content={content.content}
                      name={content.name}
                    />
                  ) : content.type == "audio" ? (
                    <AudioPlayer content={content.content} />
                  ) : (
                    <h1 className="text-white py-[2px] px-2 font-light">
                      {content.content}
                    </h1>
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
