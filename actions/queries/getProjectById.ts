import { db } from "@/lib/db";

export const getProjectById = async ({ id }: { id: string}) => {
    const project = await db.project.findFirst({
      where: {
        id
    },
    include: {
      assignedTo: {
        select: {
          id: true,
          firstName: true,
          username: true,
          imageUrl: true,
          employeeRole: true,
        },
      },
      steps: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return project;
};
