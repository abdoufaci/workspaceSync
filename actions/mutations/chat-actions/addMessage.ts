"use server";

import { ProjectFormSchema } from "@/components/forms/ProjectForm";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addMessage = async ({
  messageContents,
  fromId,
  projectId,
  chatId,
  withClient
}: any) => {
  const newMessage = await db.message.create({
    data: {
      fromId,
      projectId,
      chatId,
      withClient
    },
  })

  for(let i=0;i<messageContents.length;i++) {
    await db.messageContent.create({
      data: {
        type: messageContents[i].type,
        name: messageContents[i].name,
        content: messageContents[i].content,
        messageId: newMessage.id,
      }
    })
  }

  if(chatId) {
    pusherServer.trigger(
      toPusherKey(`chat:${chatId}`),
      "incoming_message",
      {}
    )
    console.log("triggered chatWebsocket");
  } else {
    pusherServer.trigger(
      toPusherKey(`groupe:${projectId}`),
      "incoming_message",
      {}
    )
    console.log("triggered groupeWebsocket");
  }

  //revalidatePath('/messages')
};
