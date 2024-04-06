"use server";

import { db } from "@/lib/db";
import { Role } from "@prisma/client";

interface getMembersByUsernameProps {
  role: Role;
  debouncedSearchTerm: string;
}

export const getMembersByUsername = async ({
  role,
  debouncedSearchTerm
}: getMembersByUsernameProps) => {
  if(!debouncedSearchTerm) {
    const users = await db.user.findMany({
      where: {
        role,
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
  } else{
    const users = await db.user.findMany({
      where: {
        role,
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
};
