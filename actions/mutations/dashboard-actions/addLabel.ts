"use server";

import { AddLabelFormSchema } from "@/components/forms/add-label-form";
import { db } from "@/lib/db";
import { Card, Prisma, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addLabel = async (
  label: z.infer<typeof AddLabelFormSchema>,
  task?: Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  }
) => {
  if (!task) {
    throw new Error("Task not found [Add_Label]");
  }

  const labels = task?.labels as Prisma.JsonArray;

  await db.card.update({
    where: {
      id: task?.id || "",
    },
    data: {
      labels: !labels?.length ? [label] : [...labels, label],
    },
  });

  revalidatePath("/dashboard");
};
