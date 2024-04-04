import { Separator } from "@/components/ui/separator";
import { lists } from "@/dashboard-lists";
import { cn } from "@/lib/utils";
import { Plus, Zap } from "lucide-react";
import AddTaskButton from "./_components/add-task-button";

async function Page() {
  return (
    <div className="h-[calc(100vh-81px)] w-full p-10 bg-gray-sub-100 relative space-y-10">
      <div>
        <div className="flex items-center gap-x-2">
          <h1 className="text-3xl font-semibold text-[#0D062D] ">Dashboard</h1>
          <Zap className="h-7 w-7 text-warning fill-warning" />{" "}
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-x-5">
        {lists.map((list) => (
          <div key={list.type} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3">
                <div className={cn(list.className)}></div>
                <h1>{list.title}</h1>
              </div>
              <AddTaskButton taskType={list.type} />
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
