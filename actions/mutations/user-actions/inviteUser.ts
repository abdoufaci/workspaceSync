'use server'

import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export const inviteUser = async ({ email, userRole }: any) => {
  await db.user.create({
    data: {
      email: email,
      role: userRole,
    },
  });

  await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
    identifier: email,
    notify: true,
  });

  revalidatePath("/");
};