"use server";

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

interface removerUser {
  identifierId?: string;
  identifier?: string;
  userId: string;
  isClient: boolean;
}

export const removeUser = async ({
  identifierId,
  identifier,
  userId,
  isClient,
}: removerUser) => {
  try {
    await clerkClient.allowlistIdentifiers.deleteAllowlistIdentifier(
      identifierId || ""
    );
    await clerkClient.users.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }

  const removerUser = await db.user.delete({
    where: {
      email: identifier,
    },
  });

  revalidatePath("/members/[memberType]", "page");

  return removerUser;
};
