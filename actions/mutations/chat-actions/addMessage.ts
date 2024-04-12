"use server";

import { ProjectFormSchema } from "@/components/forms/ProjectForm";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addMessage = async ({
  messageContents,
  fromId,
  projectId,
  chatId
}: any) => {
  const newMessage = await db.message.create({
    data: {
      fromId,
      projectId,
      chatId,
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

  revalidatePath('/messages')
};
