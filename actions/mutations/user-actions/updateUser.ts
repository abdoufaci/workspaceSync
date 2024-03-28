'use server'

import { db } from "@/lib/db";

export const updateUser = async ({userId, clerkUserId, firstName, lastName}: any) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      clerkUserId: clerkUserId,
      firstName,
      lastName,
      activated: true
    },
  })
};