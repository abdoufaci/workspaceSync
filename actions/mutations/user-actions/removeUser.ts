'use server'

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const removeUser = async ({ identifierId, identifier }: any) => {
  const user = await db.user.findFirst({
    where: {
      email: identifier,
    },
  });

  if (user?.clerkUserId) {
    await clerkClient.users.deleteUser(user?.clerkUserId);
  }

  await db.user.delete({
    where: {
      email: identifier,
    },
  });

  await clerkClient.allowlistIdentifiers.deleteAllowlistIdentifier(
    identifierId
  );

  revalidatePath("/");
};