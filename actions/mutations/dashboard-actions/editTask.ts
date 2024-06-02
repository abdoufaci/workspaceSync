"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { AddTaskFormSchema } from "@/components/forms/add-task-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const editTask = async (
  {
    assignTo,
    description,
    links,
    stats,
    timeline,
    title,
    image,
  }: z.infer<typeof AddTaskFormSchema>,
  id: string
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("currentUser not found [Add_Task]");
  }

  if (currentUser.role != "MANAGER") {
    throw new Error("Unauthorized");
  }

  if (!id) {
    throw new Error("List ID not found [Add_Task]");
  }

  const converted = {
    description,
    links: links.length === 0 ? null : links,
    TitleStates: stats.title,
    priority: stats.priority,
    startDate: timeline.from,
    endDate: timeline.to,
    title,
  };

  await db.card.update({
    where: {
      id,
    },
    //@ts-ignore
    data: {
      assignedTo: {
        connect: assignTo.map((employee) => ({ id: employee.id })),
      },
      ...converted,
      imageUrl: image,
    },
  });

  revalidatePath("/dashboard");
};
