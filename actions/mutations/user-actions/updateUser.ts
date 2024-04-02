"use server";

import { db } from "@/lib/db";
import { EmployeeRole } from "@prisma/client";
import { z } from "zod";

interface updateUserProps {
  userId?: string;
  role: EmployeeRole;
  adress?: string;
}

export const updateUser = async ({ userId, adress, role }: updateUserProps) => {
  await db.user.update({
    where: {
      id: userId,
    },
    data: {
      activated: true,
      employeeRole: role,
      adress,
    },
  });
};
