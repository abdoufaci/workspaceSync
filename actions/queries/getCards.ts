import { db } from "@/lib/db";
import { getCurrentUser } from "./getCurrentUser";

export const getCards = async () => {
  const currentUser = await getCurrentUser();

  const tasks =
    currentUser?.role != "MANAGER"
      ? await db.card.findMany({
          where: {
            assignedTo: {
              some: {
                clerkUserId: currentUser?.clerkUserId,
              },
            },
          },
          orderBy: {
            order: "asc",
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
            creator: {
              select: {
                imageUrl: true,
                username: true,
              },
            },
          },
        })
      : await db.card.findMany({
          orderBy: {
            order: "asc",
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
            creator: {
              select: {
                imageUrl: true,
                username: true,
              },
            },
          },
        });

  return tasks;
};
