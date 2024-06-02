"use server";

import { getCurrentUser } from "@/actions/queries/getCurrentUser";
import { AddTaskFormSchema } from "@/components/forms/add-task-form";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const AddTask = async (
  {
    assignTo,
    description,
    links,
    stats,
    timeline,
    title,
    image,
  }: z.infer<typeof AddTaskFormSchema>,
  listId?: string
) => {
  if (!listId) {
    throw new Error("List ID not found [Add_Task]");
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("currentUser not found [Add_Task]");
  }

  if (currentUser.role != "MANAGER") {
    throw new Error("Unauthorized");
  }

  const converted = {
    description,
    links,
    TitleStates: stats.title,
    priority: stats.priority,
    startDate: timeline.from,
    endDate: timeline.to,
    title,
    imageUrl: image,
  };

  Object.keys(converted).forEach((key) => {
    //@ts-ignore
    let element: any = converted[key];
    (element === undefined || element?.length === 0) &&
      //@ts-ignore
      delete converted[key];
  });

  const lastCard = await db.card.findFirst({
    where: { listId },
    orderBy: { order: "desc" },
    select: { order: true },
  });

  const newOrder = lastCard ? lastCard.order + 1 : 1;

  const newTask = await db.card.create({
    //@ts-ignore
    data: {
      assignedTo: {
        connect: assignTo.map((employee) => ({ id: employee.id })),
      },

      ...converted,
      listId: listId || "",
      order: newOrder,
      creatorId: currentUser?.id,
    },
  });

  revalidatePath("/dashboard");

  return newTask;
};
