"use server";

import { db } from "@/lib/db";
import { Card, User } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface updateCardsProps {
  cards: (Card & {
    assignedTo: User[];
  })[];
}

export const updateCards = async ({ cards }: updateCardsProps) => {
  let updatedCards;
  try {
    const transaction = cards.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    throw new Error("Failed to update the cards");
  }

  revalidatePath("/dashboard");
};
