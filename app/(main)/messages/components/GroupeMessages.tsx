"use client";

import { getChat } from "@/actions/mutations/chat-actions/getChat";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { File, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import FileMessage from "./FileMessage";
import VideoPlayer from "./VideoPlayer";
import ImageMessage from "./ImageMessage";

export default function GroupeMessages({ project, currentUser }: any) {
  const router = useRouter();
  const chatRef = useRef<ElementRef<"div">>(null);
  //const [chatMessages, setChatMessages] = useState(initialData.messages);

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`groupe:${project.id}`));
    console.log("subsribed to groupeWebsocket");

    const messageHandler = () => {
      router.refresh();
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`groupe:${project.id}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, []);

  useEffect(() => {
    chatRef.current?.scrollIntoView(false);
  }, [project]);

  return (
    <div className="flex flex-col" ref={chatRef}>
      {project.messages.map((message: any) => (
        <div
          key={message.id}
          className={`flex px-4 py-1 gap-x-2 w-full ${
            currentUser?.id == message.fromId && "self-end flex-row-reverse"
          }`}
        >
          <Image
            alt="logo"
            src={message.from.imageUrl || "/avatar.png"}
            height={"200"}
            width={"200"}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col gap-y-1">
            <h1
              className={`font-semibold text-sm ${
                currentUser?.id == message.fromId && "self-end"
              }`}
            >
              {message.from.firstName}
            </h1>
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
