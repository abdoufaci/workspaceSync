"use server";

import { AddProjectFormSchema } from "@/components/forms/AddProjectForm";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addProject = async ({
  image,
  title,
  description,
  assignTo,
  teamLeader,
  client,
  timeline,
  stat,
  steps,
  projectDetails,
}: z.infer<typeof AddProjectFormSchema>) => {
  const newProject = await db.project.create({
    data: {
      imageUrl: image,
      title,
      description,
      assignedTo: {
        connect: assignTo.map(employee => ({id: employee.id}))
      },
      teamLeaderId: teamLeader.id,
      clientId: client.id,
      from: timeline.from,
      to: timeline.to,
      stat,
      projectDetails,
    },
  })

  steps.map(async step => {
    await db.step.create({
      data: {
        id: step.id,
        title: step.title,
        completed: step.completed,
        projectId: newProject.id
      },
    })
  })

  revalidatePath("/my-projects")
};
