import { Separator } from "@/components/ui/separator";
import { lists } from "@/dashboard-lists";
import { cn } from "@/lib/utils";
import { Plus, Zap } from "lucide-react";
import AddTaskButton from "./_components/add-task-button";
import TaskList from "./_components/task-list";
import { getCards } from "@/actions/queries/getCards";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListContainer from "./_components/list-container";
import { regroupedCards } from "@/groupedCards";
import { getCurrentUser } from "@/actions/queries/getCurrentUser";

async function Page() {
  const cards = await getCards();
  const currentUser = await getCurrentUser();

  return (
    <ListContainer
      //@ts-ignore
      lists={regroupedCards({ cards })}
      currentUser={currentUser}
    />
  );
}

export default Page;
