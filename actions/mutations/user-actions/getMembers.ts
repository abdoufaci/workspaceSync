"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

interface getMembers {
  userId: string;
  userRole: Role;
  debouncedSearchTerm: string;
}

export const getMembers = async ({
  userId,
  userRole,
  debouncedSearchTerm
}: getMembers) => {
  if(!debouncedSearchTerm) {
    if(userRole == "MANAGER") {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              role: "CLIENT",
            },
            {
              role: "EMPLOYEE"
            }
          ]
        },
        select: {
          id: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
          username: true,
          employeeRole: true
        },
      })
      
      return users
    }
    if(userRole == "EMPLOYEE") {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              role: "MANAGER",
            },
            {
              role: "EMPLOYEE"
            }
          ],
          NOT: {
            id: userId
          }
        },
        select: {
          id: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
          username: true,
          employeeRole: true
        },
      })
      
      return users
    }
  } else{
    if(userRole == "MANAGER") {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              role: "CLIENT",
            },
            {
              role: "EMPLOYEE"
            }
          ],
          firstName: {
            contains: debouncedSearchTerm,
          },
        },
        select: {
          id: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
          username: true,
          employeeRole: true
        },
      })

      return users
    }
    if(userRole == "EMPLOYEE") {
      const users = await db.user.findMany({
        where: {
          OR: [
            {
              role: "MANAGER",
            },
            {
              role: "EMPLOYEE"
            }
          ],
          NOT: {
            id: userId
          },
          firstName: {
            contains: debouncedSearchTerm,
          },
        },
        select: {
          id: true,
          imageUrl: true,
          firstName: true,
          lastName: true,
          username: true,
          employeeRole: true
        },
      })

      return users
    }
  }
};
