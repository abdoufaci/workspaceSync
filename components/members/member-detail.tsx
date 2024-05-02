"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MessageCircleMore, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MemberStatus from "./member-status";
import Link from "next/link";

export const MemberDetail = () => {
  const { isSelectedMemberOpen, data, onCloseSelectedMember, onOpen } =
    useModal();

  const { user } = data;

  return (
    <div
      className={cn(
        "h-[95%]  max-w-[450px] my-auto overflow-hidden m-auto bg-white rounded-[3.3px]  pb-7 relative transition-all duration-300 ease-out",
        isSelectedMemberOpen && data ? "w-[30%]" : "w-0"
      )}>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-xl font-medium text-[#191919] ">
          {user?.role === "EMPLOYEE" ? "Employee" : "Client"} Detaills
        </h1>
        <Button
          onClick={onCloseSelectedMember}
          className="h-auto w-auto p-2 text-neutral-600"
          variant={"ghost"}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <Separator className="w-[90%] mx-auto " />
      <ScrollArea className="h-[92%]">
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <div className="relative">
            <Image
              alt="logo"
              src={user?.imageUrl || "/avatar.png"}
              height={200}
              width={200}
              className="h-40 w-40 rounded-full object-cover"
            />
            <Link href={`/messages/${user?.id}`}>
              <div className="bg-secondary-1 rounded-full p-3 w-fit absolute top-0 right-0">
                <MessageCircleMore className="h-6 w-6 text-white" />
              </div>
            </Link>
          </div>
          <div className="space-y-1">
            <h1 className="font-semibold text-center">{user?.username} </h1>
            <h1 className="text-[#757575] text-sm text-center">
              {user?.employeeRole}
            </h1>
          </div>
        </div>
        <Separator className="w-[90%] mx-auto " />
        <div className="space-y-5 p-5">
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Phone : </span>
            <h1>{user?.phoneNumber}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Email : </span>
            <h1>{user?.email}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Address : </span>
            <h1>{user?.adress}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Stat : </span>
            <MemberStatus
              isActivated={user?.activated}
              projects={user?.projects}
            />
          </div>
        </div>
        <Separator className="w-[90%] mx-auto" />
        <div className="min-h-52 p-5">
          <h1 className="text-[#182233] font-medium text-lg">Description</h1>
          <p className="text-[#576070] ">
            {user?.bio || "A veryyyyyyyy good guy"}
          </p>
        </div>
        <Button
          onClick={() =>
            onOpen("editUser", {
              user,
            })
          }
          className="w-[90%] mx-auto bg-primary-blue/95 hover:bg-primary-blue m-5">
          Edit
        </Button>
      </ScrollArea>
    </div>
  );
};
