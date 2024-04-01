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
      }
    })

    return users
  } else{
    const users = await db.user.findMany({
      where: {
        role,
        //later : change it to username
        firstName: {
          contains: debouncedSearchTerm,
        },
      }
    })

    return users
  }
};
