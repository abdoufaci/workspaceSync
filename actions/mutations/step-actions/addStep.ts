"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addStep = async ({
  title,
  completed,
  projectId,
  revalidate
}: { title: string, completed: boolean, projectId: string, revalidate: boolean }) => {
    await db.step.create({
      data: {
        title,
        completed,
        projectId,
      },
    })

  if(revalidate) {
    revalidatePath("/my-projects")
  }

  return { lastOne: revalidate }
};
