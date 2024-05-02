import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

export const getProjects = async () => {
  const currentUser = await getCurrentUser();

  try {
    const projects =
      currentUser?.role === "MANAGER"
        ? await db.project.findMany({
            include: {
              assignedTo: {
                select: {
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
        : await db.project.findMany({
            where: {
              OR: [
                {
                  clientId: currentUser?.id
                },{

                  assignedTo: {
                    some: {
                      id: currentUser?.id,
                    },
                  },
                }
                ]
            },
            include: {
              assignedTo: {
                select: {
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
          });

    return projects;
  } catch (error) {
    throw new Error("Something went wrong fetching projects");
  }
};
