"use server";

import { AddProjectFormSchema } from "@/components/forms/AddProjectForm";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
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
    let done = false

    for(let i=0;i<steps.length;i++) {
      if(step.id === steps[i].id) {
        done = true

        await db.step.update({
          where: {
            id: step.id
          },
          data: {
            completed: steps[i].completed,
          }
        })
      }
    }

    if(!done) {
      await db.step.delete({
        where: {
          id: step.id
        }
      })
    } 
  })

  steps.map(async (step: any) => {
    let done = false
    for(let i=0;i<editedProject.steps.length;i++) {
      if(step.id === editedProject.steps[i].id) {
        done = true
      }
    }
    if(!done) {
      await db.step.create({
        data: {
          id: step.id,
          title: step.title,
          completed: step.completed,
          projectId: editedProject.id
        },
      })
    }
  })

  revalidatePath("/my-projects")
};
