"use server";

import { ProjectFormSchema } from "@/components/forms/ProjectForm";
import { db } from "@/lib/db";
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
}: z.infer<typeof ProjectFormSchema>) => {
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

  return { steps, projectId: newProject.id}
};
