"use server";

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
    },
  });

  revalidatePath("/dashboard");

  return newTask;
};
