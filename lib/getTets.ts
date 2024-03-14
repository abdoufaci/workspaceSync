import { db } from "@/db";

export const getTest = async () => {
  const h = await db.test.findMany();

  return h;
};
