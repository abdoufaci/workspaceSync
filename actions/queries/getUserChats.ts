import { db } from "@/lib/db";
import { Role } from "@prisma/client";

export const getUserChats = async ({ userId, userRole }: { userId: string, userRole: Role}) => {
  try{
    if(userRole == "EMPLOYEE") {
      const data = await db.user.findUnique({
        where: {
        id: userId,
      },
      include: {
        projects: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
          },
        },
        chats: {
          /*where: {
            messages: messages.length > 0
          },*/
          include: {
            users: {
              where: {
                NOT: {
                  id: userId,
                },
              },
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                imageUrl: true,
                role: true,   
              },
            },
          },
        },
      },
    });
    
    if(!data) {
      throw new Error("Couldn't find the project you're looking for")
    }

    let chats = []

    for(let i=0; i < data.chats.length; i++) {
      chats.push(data.chats[i].users[0])
    }
    
    return { projects: data.projects, chats };
  }
  if(userRole == "MANAGER") {
    const data = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        chats: {
        /*where: {
          messages: messages.length > 0
        },*/
          include: {
            users: {
              where: {
                NOT: {
                  id: userId,
                },
              },
              select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                imageUrl: true,
                role: true,   
              },
            },
          },
        },
      },
    });

    const allProjects = await db.project.findMany();
  
    if(!data || !allProjects) {
      throw new Error("Couldn't find the project you're looking for")
    }

    let chats = []

    for(let i=0; i < data.chats.length; i++) {
      chats.push(data.chats[i].users[0])
    }
  
    return { projects: allProjects, chats };
  }
  if(userRole == "CLIENT") {
    const managers = await db.user.findMany({
      where: {
        role: "MANAGER"
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        imageUrl: true,
        role: true,   
      }
    })

    const data = await db.user.findUnique({
      where: {
        id: userId
      },
      include: {
        projects: {
          include: {
            teamLeader: {
              select: {   
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                imageUrl: true,  
                role: true,   
              }
            }
          }
        },
      }
    })

    if(!managers || !data) {
      throw new Error("Couldn't find the project you're looking for")
    }

    let teamLeaders = []

    for(let i=0; i < data.projects.length; i++) {
      let duplicate = false

      for(let j=0; j < teamLeaders.length; j++) {
        if( teamLeaders[j].id == data.projects[i].teamLeaderId) duplicate = true
      }

      if(!duplicate) {
        teamLeaders.push(data.projects[i].teamLeader)
      }
    }
  
    return { projects: [], chats: [...managers, ...teamLeaders] };
  }
} catch(error: any) {
  throw new Error(error.message || "Something went wrong fetching user chats")
}
};
