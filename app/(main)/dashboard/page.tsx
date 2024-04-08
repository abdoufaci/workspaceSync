import { Separator } from "@/components/ui/separator";
import { lists } from "@/dashboard-lists";
import { cn } from "@/lib/utils";
import { Plus, Zap } from "lucide-react";
import AddTaskButton from "./_components/add-task-button";
import TaskList from "./_components/task-list";
import { getCards } from "@/actions/queries/getCards";

async function Page() {
  const cards = await getCards();

  return (
    <div className="min-h-[calc(100vh-81px)] w-full p-10 bg-gray-sub-100 relative space-y-10">
      <div>
        <div className="flex items-center gap-x-2">
          <h1 className="text-3xl font-semibold text-[#0D062D] ">Dashboard</h1>
          <Zap className="h-7 w-7 text-warning fill-warning" />{" "}
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-x-5">
        {lists.map((list) => (
          <TaskList
            className={list.className}
            title={list.title}
            type={list.type}
            key={list.title}
            //@ts-ignore
            cards={cards}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
