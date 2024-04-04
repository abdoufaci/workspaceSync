"use server";

import { db } from "@/lib/db";
import { EmployeeRole } from "@prisma/client";
import { z } from "zod";

interface updateUserProps {
  userId?: string;
  employeeRole?: EmployeeRole;
  adress?: string;
  desctiption?: string;
  fullName?: string;
}

export const updateUser = async ({
  userId,
  adress,
  employeeRole,
  desctiption,
  fullName,
}: updateUserProps) => {
  const converted = {
    adress,
    employeeRole,
    bio: desctiption,
    fullName,
  };

  Object.keys(converted).forEach(
    //@ts-ignore
    (key) => converted[key] === undefined && delete converted[key]
  );

  if (converted.fullName != undefined) {
    let splitedFulName = fullName?.split(" ");
    Object.assign(converted, { firstName: splitedFulName?.[0] });

    Object.assign(converted, { lastName: splitedFulName?.[1] });
    delete converted.fullName;
  }

  const user = await db.user.update({
    where: {
      id: userId,
    },
    //@ts-ignore
    data: {
      activated: true,
      ...converted,
    },
  });

  return user;
};
