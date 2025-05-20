import { db } from "@/lib/db";

export const getProjectById = async ({
  id,
  withClient,
}: {
  id: string;
  withClient: boolean;
}) => {
  try {
    const project = await db.project.findFirst({
      where: {
        id,
      },
      include: {
        assignedTo: {
          select: {
            id: true,
            imageUrl: true,
            firstName: true,
            lastName: true,
            username: true,
            employeeRole: true,
          },
        },
        steps: {
          select: {
            title: true,
            completed: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        teamLeader: {
          select: {
            id: true,
            imageUrl: true,
            firstName: true,
            lastName: true,
            username: true,
            employeeRole: true,
          },
        },
        client: {
          select: {
            id: true,
            imageUrl: true,
            firstName: true,
            lastName: true,
            username: true,
            employeeRole: true,
          },
        },
        messages: {
          where: {
            withClient,
          },
          include: {
            from: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                imageUrl: true,
              },
            },
            contents: true,
          },
        },
      },
    });

    if (!project) {
      throw new Error("Couldn't find the project you're looking for");
    }

    return project;
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong fetching project infos"
    );
  }
};
