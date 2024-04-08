import { cn } from "@/lib/utils";
import AddTaskButton from "./add-task-button";
import { Separator } from "@/components/ui/separator";
import { getCards } from "@/actions/queries/getCards";
import Card from "./card";
import { Card as ListCard, User } from "@prisma/client";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface TaskListProps {
  title: string;
  type: string;
  className: string;
  cards: (ListCard & {
    assignedTo: User[];
  })[];
}

async function TaskList({
  title,
  className,
  type,
  cards: allCards,
}: TaskListProps) {
  const cards = allCards.filter((card) => card.listId === type);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <div className={cn(className)}></div>
          <h1>{title}</h1>
        </div>
        <AddTaskButton taskType={type} />
      </div>
      <Separator />
      <div className="space-y-5">
        {cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
