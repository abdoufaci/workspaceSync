"use server";

import { db } from "@/lib/db";

interface updateUserProps {
  userId?: string;
  clerkUserId?: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

export const updateUser = async ({
  userId,
  clerkUserId,
  firstName,
  lastName,
  imageUrl,
}: updateUserProps) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      clerkUserId,
      firstName,
      lastName,
      activated: true,
      imageUrl,
    },
  });
};
