"use client";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import TaskList from "./task-list";
import { Zap } from "lucide-react";
import { Card, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { listsType } from "@/groupedCards";
import { useMutation } from "@tanstack/react-query";
import { updateCards } from "@/actions/mutations/dashboard-actions/updateCards";
import { toast } from "sonner";

interface ListContainerProps {
  lists: listsType;
  currentUser: User | null;
}

type cardType = {
  cards: (Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  })[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

function ListContainer({ lists, currentUser }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(lists);

  useEffect(() => {
    setOrderedData(lists);
  }, [lists]);

  const { mutate: updateCardsMutation } = useMutation({
    mutationFn: ({ cards }: cardType) =>
      updateCards({
        cards,
      }),
    onSuccess() {
      toast.success("cards updated!");
    },
    onError() {
      toast.error("failed to update the card, try again.");
    },
  });

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "card") {
      let newOrderedData = [...orderedData];

      const sourceList = newOrderedData.find(
        (list) => list.type === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.type === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if card exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if card exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCard.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCard;

        console.log({
          reorderedCard,
        });

        updateCardsMutation({ cards: reorderedCard });

        setOrderedData(newOrderedData);
      } else {
        // User moves the card to another list

        //Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //Assing the new listId to the moved car
        movedCard.listId = destination.droppableId;

        // Add card to the destionation list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destionation list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        updateCardsMutation({ cards: destList.cards });

        setOrderedData(newOrderedData);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="min-h-[calc(100vh-81px)] w-full p-10 bg-gray-sub-100 relative space-y-10">
        <div>
          <div className="flex items-center gap-x-2">
            <h1 className="text-3xl font-semibold text-[#0D062D] ">
              Dashboard
            </h1>
            <Zap className="h-7 w-7 text-warning fill-warning" />{" "}
          </div>
        </div>
        <Droppable droppableId="lists" type="list" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-[1700px] mx-auto">
              {orderedData.map((list, idx) => (
                <TaskList
                  className={list.className}
                  title={list.title}
                  type={list.type}
                  key={list.title}
                  //@ts-ignore
                  cards={list.cards}
                  idx={idx}
                  currentUser={currentUser}
                />
              ))}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default ListContainer;
