"use client";

import { variants } from "@/components/forms/add-task-form";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Card as ListCard, Prisma, User } from "@prisma/client";
import { Paperclip } from "lucide-react";
import Image from "next/image";

interface CardProps {
  card: ListCard & {
    assignedTo: User[];
  };
}

function Card({ card }: CardProps) {
  let TitleStates = card.TitleStates as Prisma.JsonArray;
  const links = card?.links as Prisma.JsonArray;

  const items = card.assignedTo.map((employee, idx) => ({
    id: idx,
    name: employee.username || "workspaceSync employee",
    image: employee.imageUrl || "/avatar.png",
    designation: employee.employeeRole || "Chikoour",
  }));

  return (
    <div role="button" className="bg-white rounded-2xl p-4 shadow-lg space-y-3">
      <div className="flex flex-wrap gap-3">
        <Badge
          //@ts-ignore
          variant={variants[card.priority]}
          className="rounded-full font-normal !m-0 py-1.5">
          <h3 className="text-xs">{card.priority}</h3>
        </Badge>
        {TitleStates?.map((title) => (
          <div
            style={{
              //@ts-ignore
              backgroundColor: title?.bgColor,
            }}
            className="p-1.5 text-xs px-4 rounded-full w-fit whitespace-nowrap !m-0">
            <h1>
              {
                //@ts-ignore
                title?.title
              }
            </h1>
          </div>
        ))}
      </div>
      <h1 className="font-semibold ">{card.title}</h1>
      {card.imageUrl && (
        <Image
          src={card.imageUrl}
          alt="image"
          height={500}
          width={500}
          className="w-full h-full rounded-xl max-h-56 object-cover"
        />
      )}
      <div
        className={cn(
          "flex items-center w-full pr-2",
          card.links ? "justify-between" : "justify-end"
        )}>
        {card.links && (
          <div className="text-[#5A5A5A] flex items-center gap-1 flex-grow text-xs">
            <Paperclip className="h-3.5 w-3.5" />
            {links.length}
          </div>
        )}
        <div className="flex  items-center gap-1">
          <h1 className="text-[#5A5A5A] text-sm">Assigned to</h1>

          <div className="flex items-center gap-2">
            <AnimatedTooltip items={items} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
