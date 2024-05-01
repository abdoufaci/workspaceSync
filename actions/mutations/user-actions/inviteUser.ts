"use server";

import { InviteUserformSchema } from "@/components/forms/InviteForm";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const inviteUser = async ({
  email,
  role,
}: z.infer<typeof InviteUserformSchema>) => {
  try {
    await db.user.create({
      data: {
        email,
        //@ts-ignore
        role: role === "CLIENT" ? Role.CLIENT : Role.EMPLOYEE,
        activated: role === "CLIENT" ? true : false,
      },
    });
  } catch (error) {
    console.log("Failed to invite user cuz >>>>", error);
    throw new Error("Failed to invite user");
  }

  await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
    identifier: email,
    notify: true,
  });

  revalidatePath("/members/[memberType]", "page");
};
