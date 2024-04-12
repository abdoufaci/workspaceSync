import { db } from "@/lib/db";

export const getCards = async () => {
  const tasks = await db.card.findMany({
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
