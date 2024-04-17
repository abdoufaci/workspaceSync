'use server'

import { db } from "@/lib/db";

export const getChat = async ({
  currentUserId,
  chatPartnerId
}: any) => {
  let chat = await db.chat.findFirst({
    where: {
      users: {
        every: {
          OR: [{ id: chatPartnerId }, { id: currentUserId }],
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
          connect: [{ id: currentUserId }, { id: chatPartnerId }],
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
  }

  return chat
}