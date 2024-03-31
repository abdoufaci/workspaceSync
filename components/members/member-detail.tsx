"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export const MemberDetail = () => {
  const { isSelectedMemberOpen, data, onCloseSelectedMember } = useModal();

  const { user } = data;

  if (!isSelectedMemberOpen || !data) return null;

  return (
    <div className="h-[95%] w-[30%] max-w-[450px] my-auto mx-auto bg-white rounded-[3.3px] p-5 pb-7 relative">
      <div className="flex items-center justify-between">
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
      <Separator className="mt-4" />
      <ScrollArea className="h-[92%]">
        <div className="flex flex-col items-center justify-center space-y-3 py-4">
          <Image
            alt="logo"
            src={user?.imageUrl || "/avatar.png"}
            height={200}
            width={200}
            className="h-40 w-40 rounded-full object-cover"
          />
          <div className="space-y-1">
            <h1 className="font-semibold text-center">
              {user?.firstName} {user?.lastName}{" "}
            </h1>
            <h1 className="text-[#757575] text-sm text-center">
              Designer maskin
            </h1>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="space-y-5">
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Phone : </span>
            <h1>+2131325132288</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Email : </span>
            <h1>{user?.email}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Address : </span>
            <h1>Beni mared, Blida</h1>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#576070]">Stat : </span>
            <Badge variant={`${user?.activated ? "working" : "pending"}`}>
              {user?.activated ? "Working" : "Pending"}
            </Badge>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="min-h-52">
          <h1 className="text-[#182233] font-medium text-lg">Description</h1>
          <p className="text-[#576070] ">
            {user?.bio || "A veryyyyyyyy good guy"}
          </p>
        </div>
        <Button className="w-full bg-primary-blue/95 hover:bg-primary-blue">
          Edit
        </Button>
      </ScrollArea>
    </div>
  );
};
