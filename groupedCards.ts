import { Card, User } from "@prisma/client";
import { lists } from "./dashboard-lists";

interface regroupedCardsProps {
  cards: (Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  })[];
}

export type listsType = {
  cards: (Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  })[];
  title: string;
  className: string;
  type: string;
}[];

export const regroupedCards = ({ cards }: regroupedCardsProps) => {
  let defaultlists: listsType = lists.map((list) => ({
    ...list,
    cards: [],
  }));

  cards.map((card) => {
    const neededlist = defaultlists.find((list) => list.type === card.listId);
    neededlist?.cards.push(card);
  });

  return defaultlists;
};
