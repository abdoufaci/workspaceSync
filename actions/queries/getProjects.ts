import { db } from "@/lib/db";

export const getProjects = async () => {
  try{
    const projects = await db.project.findMany({
      include: {
        assignedTo: {
          select: {
            username: true,
            imageUrl: true,
            employeeRole: true,
          },
        },
        steps: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });  
  
    return projects;
  } catch(error) {
    throw new Error("Something went wrong fetching projects")
  }
};
