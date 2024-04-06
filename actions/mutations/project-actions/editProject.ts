"use server";

import { ProjectFormSchema } from "@/components/forms/ProjectForm";
import { db } from "@/lib/db";
import { z } from "zod";

export const editProject = async ({
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
  id
}: any) => {
  const editedProject = await db.project.update({
    where: {
      id
    },
    data: {
      imageUrl: image,
      title,
      description,
      assignedTo: {
        connect: assignTo.map((employee: any) => ({id: employee.id}))
      },
      teamLeaderId: teamLeader.id,
      clientId: client.id,
      from: timeline.from,
      to: timeline.to,
      stat,
      projectDetails,
    },
    include: {
      steps: true
    }
  })

  editedProject.steps.map(async step => {
    await db.step.delete({
      where: {
        id: step.id
      }
    }) 
  })

  return { steps }
};
