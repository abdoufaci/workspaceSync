"use server";

import { db } from "@/lib/db";
import { Role, User } from "@prisma/client";

interface getEmployeesProps {
  pageParam?: string;
  role?: Role;
}

const MEMBERS_BATCH = 1;

export const getMembers = async ({
  pageParam: cursor,
  role,
}: getEmployeesProps) => {
  let users: User[] = [];
  if (cursor) {
    users = await db.user.findMany({
      where: {
        role,
      },
      take: MEMBERS_BATCH,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      where: {
        role,
      },
      take: MEMBERS_BATCH,
      orderBy: {
        createdAt: "desc",
      },
    });
  }
  let nextCursor = null;
  if (users.length === MEMBERS_BATCH) {
    nextCursor = users[users.length - 1].id;
  }

  return {
    users,
    nextCursor,
  };
};
