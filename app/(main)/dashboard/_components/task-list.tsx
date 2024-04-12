"use client";

import { cn } from "@/lib/utils";
import AddTaskButton from "./add-task-button";
import { Separator } from "@/components/ui/separator";
import { getCards } from "@/actions/queries/getCards";
import Card from "./card";
import { Card as ListCard, User } from "@prisma/client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import TaskDetail from "./task-detail";

interface TaskListProps {
  title: string;
  type: string;
  className: string;
  cards: (ListCard & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  })[];
  idx: number;
}

function TaskList({
  title,
  className,
  type,
  cards: allCards,
  idx,
}: TaskListProps) {
  const cards = allCards.filter((card) => card.listId === type);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <div className={cn("", className)}></div>
          <h1>{title}</h1>
        </div>
        <AddTaskButton taskType={type} />
      </div>
      <Separator />
      <Droppable droppableId={type} type="card">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-5">
            {cards.map((card, idx) => (
              <Sheet>
                <SheetTrigger className="w-full">
                  <Card card={card} key={card.id} idx={idx} />
                </SheetTrigger>
                <SheetContent>
                  <TaskDetail card={card} />
                </SheetContent>
              </Sheet>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskList;
