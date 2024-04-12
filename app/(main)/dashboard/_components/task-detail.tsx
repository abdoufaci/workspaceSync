"use client";

import { variants } from "@/components/forms/add-task-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { titlesState } from "@/titles";
import { Card, Prisma, User } from "@prisma/client";
import { Calendar, Paperclip, PenLine, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TaskDetailProps {
  card: Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  };
}

function TaskDetail({ card }: TaskDetailProps) {
  const { onOpen } = useModal();

  const bgColors = {
    todo: {
      className: "bg-primary-blue",
      title: "TO DO",
    },
    inprogress: { className: "bg-warning", title: "In Progress " },
    inreview: { className: "bg-orange", title: "In Review " },
    completed: { className: "bg-success", title: "Completed " },
  };

  return (
    <div className="relative h-screen">
      <div className="mb-5">
        <PenLine
          onClick={() => onOpen("editTask", { task: card })}
          className="h-4 w-4 text-secondary-1 cursor-pointer"
        />
      </div>
      <ScrollArea className="h-[90vh]">
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Badge
              //@ts-ignore
              variant={variants[card.priority]}
              className="rounded-full font-normal !m-0 py-1.5">
              <h3 className="text-xs">{card.priority}</h3>
            </Badge>
            {
              //@ts-ignore
              card.TitleStates?.map(({ bgColor, title }: any) => (
                <div
                  style={{
                    backgroundColor: bgColor,
                  }}
                  key={title}
                  className="p-1.5 text-xs px-4 rounded-full w-fit whitespace-nowrap !m-0">
                  <h1>{title}</h1>
                </div>
              ))
            }
          </div>
          <h1 className="font-semibold text-left">{card.title}</h1>
          <p className="text-gray-sub-300 text-sm">{card.description}</p>
        </div>
        <Separator className="my-3" />
        <div className="space-y-5">
          <div
            className={cn(
              "flex flex-wrap gap-3",
              card.assignedTo.length > 1 ? "items-start" : "items-center"
            )}>
            <h1 className="text-gray-sub-300 text-sm whitespace-nowrap">
              Created By
            </h1>
            <div className="flex items-center gap-2 rounded-full p-1 border pr-2 ">
              <Image
                alt="avatar"
                src={card.creator.imageUrl || ""}
                height={100}
                width={100}
                className="w-7 h-7 rounded-full"
              />
              <h1 className="text-xs text-secondary-1">
                {card.creator.username}
              </h1>
            </div>
          </div>
          <div
            className={cn(
              "flex flex-wrap gap-3",
              card.assignedTo.length > 1 ? "items-start" : "items-center"
            )}>
            <h1 className="text-gray-sub-300 text-sm whitespace-nowrap">
              Assigned to
            </h1>
            {card.assignedTo.map((employee) => (
              <div className="flex items-center gap-2 rounded-full p-1 border pr-2 ">
                <Image
                  alt="avatar"
                  src={employee.imageUrl || ""}
                  height={100}
                  width={100}
                  className="w-7 h-7 rounded-full"
                />
                <h1 className="text-xs text-secondary-1">
                  {employee.username}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-gray-sub-300 text-sm">Timeline</h1>
            <div className="py-1.5 px-3 rounded border border-black flex items-center gap-2">
              <Calendar className="h-3 w-3" />
              <h1 className="text-xs">
                {card.startDate.toDateString()} - {card.endDate.toDateString()}
              </h1>
            </div>
          </div>

          {card.links && (
            <div className="flex items-start gap-3">
              <h1 className="text-gray-sub-300 text-sm">Links</h1>
              <div className="flex items-center flex-wrap gap-2">
                {
                  //@ts-ignore
                  card.links?.map((link: any) => (
                    <Link
                      href={link.link}
                      className="underline"
                      target="_blank">
                      {link.title}
                    </Link>
                  ))
                }
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <h1 className="text-gray-sub-300 text-sm">Status</h1>
            <div className="bg-[#E7F1F8] flex items-center gap-1 text-xs rounded-md p-2 text-secondary-1">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  //@ts-ignore
                  bgColors[card.listId].className
                )}></div>
              <h1>
                {
                  //@ts-ignore
                  bgColors[card.listId].title
                }
              </h1>
            </div>
          </div>
          {card.imageUrl && (
            <Image
              alt="example"
              src={card.imageUrl}
              height={500}
              width={500}
              className="w-full rounded-lg object-cover"
            />
          )}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-2xl text-primary-blue font-medium">
              <Paperclip className="h-5 w-5" />
              <h1>Labels</h1>
            </div>
            <Button
              onClick={() => onOpen("addLabel", { task: card })}
              className="h-auto w-auto p-2 text-gray-sub-300"
              variant={"ghost"}>
              <Plus className="h-4 w-4" />
              <h1>Add label</h1>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default TaskDetail;
