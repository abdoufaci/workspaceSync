import { db } from "@/lib/db";

export const getProjects = async () => {
  const projects = await db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        assignedTo: {
          select: {
            imageUrl: true
          }
        }
      }
    });

  return projects;
};
