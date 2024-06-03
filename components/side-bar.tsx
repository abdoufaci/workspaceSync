"use client";

import { cn } from "@/lib/utils";
import { sidebarcontent } from "@/side-bar-content";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { Check, ChevronDown } from "lucide-react";
import { Popover, PopoverClose, PopoverTrigger } from "./ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "./ui/button";
import { EmployeeRole, Project, Role, User } from "@prisma/client";
import { ScrollArea } from "./ui/scroll-area";

interface SideBarProps {
  role?: Role;
  projects?: (Project & {
    assignedTo: {
      username: string | null;
      employeeRole: EmployeeRole | null;
      imageUrl: string | null;
    }[];
  } & {
    steps: {
      id: string;
      title: string;
      completed: boolean;
      projectId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  })[];
}

function SideBar({ role, projects }: SideBarProps) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);

  const popoverCloseRef = useRef<ElementRef<"button">>(null);

  const pathname = usePathname();
  const { memberType } = useParams();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const filteredSideBarList = sidebarcontent.filter((item) =>
    role === "CLIENT"
      ? item.label != "/members" && item.label != "/dashboard"
      : role === "EMPLOYEE"
      ? item.label != "/members"
      : item
  );

  return (
    <div
      onMouseEnter={() => setOpenSideBar(true)}
      onMouseLeave={() => {
        popoverCloseRef.current?.click();
        setOpenSideBar(false);
        setPopoverIsOpen(false);
      }}
      className={cn(
        "border-r overflow-x-hidden h-screen sticky top-0 flex flex-col items-center transition-all duration-300 ease-out",
        openSideBar ? "!w-80" : "w-[90px] "
      )}>
      <div
        className={cn(
          "flex text-[#404040] border-b w-full  -space-x-5 transition-all duration-300 ease-out",
          openSideBar ? "items-center " : "items-center"
        )}>
        <Image
          alt="logo"
          src="/logo.svg"
          height={"50"}
          width={"50"}
          className="h-20 w-[90px]"
        />
        <h1
          className={cn(
            "font-semibold transition-all duration-100 ease-out",
            openSideBar ? "text-xl" : "text-[0px]"
          )}>
          WorkSpaceSync
        </h1>
      </div>
      <div
        className={cn(
          "space-y-4 flex flex-col w-full  pl-5  transition-all duration-300 ease-out py-8",
          openSideBar
            ? "items-start justify-center"
            : "items-start justify-start"
        )}>
        {filteredSideBarList.map(({ icon: Icon, title, label }) => (
          <div key={label}>
            {label === "/members" ? (
              <div className="z-50">
                <Popover>
                  <PopoverTrigger asChild>
                    <div
                      role="button"
                      key={label}
                      onClick={() => setPopoverIsOpen((prev) => !prev)}
                      className={cn(
                        "flex items-center py-3 text-secondary-1 w-fit px-3 transition-all duration-200 ease-out  ",
                        openSideBar ? "gap-x-3 px-10" : "justify-center",
                        pathname.includes(label)
                          ? "nav-button-background rounded-full text-white  bg-blend-color-burn"
                          : "",
                        popoverIsOpen && "mb-20"
                      )}>
                      {Icon}
                      <h1
                        className={cn(
                          "whitespace-nowrap transition-all duration-100 ease-out",
                          openSideBar ? "text-base" : "text-[0px]"
                        )}>
                        {title}
                      </h1>
                      {openSideBar && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4",
                            pathname.includes(label)
                              ? "text-white"
                              : "text-secondary-1"
                          )}
                        />
                      )}
                    </div>
                  </PopoverTrigger>
                  <PopoverClose hidden>
                    <button hidden ref={popoverCloseRef} />
                  </PopoverClose>
                  <PopoverContent
                    align="center"
                    side="bottom"
                    sideOffset={10}
                    className="shadow-md rounded p-1 ">
                    <Link href={`${label}/client`}>
                      <Button
                        className={cn(
                          "w-full h-auto relative",
                          memberType === "client" && "bg-gray-sub-100"
                        )}
                        variant={"ghost"}>
                        {memberType === "client" && (
                          <Check className="h-4 w-4 absolute top-[50%] left-5 transform translate-y-[-50%]" />
                        )}
                        <h1>Client</h1>
                      </Button>
                    </Link>
                    <Link href={`${label}/employee`}>
                      <Button
                        className={cn(
                          "w-full h-auto relative",
                          memberType === "employee" && "bg-gray-sub-100"
                        )}
                        variant={"ghost"}>
                        {memberType === "employee" && (
                          <Check className="h-4 w-4 absolute top-[50%] left-5 transform translate-y-[-50%]" />
                        )}
                        <h1>Employee</h1>
                      </Button>
                    </Link>
                  </PopoverContent>
                </Popover>
              </div>
            ) : (
              <Link
                key={label}
                href={label}
                className={cn(
                  "flex items-center py-3 text-secondary-1 w-fit px-3 transition-all duration-200 ease-out",
                  openSideBar ? "gap-x-3 px-10" : "justify-center",
                  pathname.includes(label)
                    ? "nav-button-background rounded-full text-white  bg-blend-color-burn"
                    : ""
                )}>
                {Icon}
                <h1
                  className={cn(
                    "whitespace-nowrap transition-all duration-100 ease-out",
                    openSideBar ? "text-base" : "text-[0px]"
                  )}>
                  {title}
                </h1>
                {openSideBar && pathname === label && label === "/members" && (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Link>
            )}
          </div>
        ))}
      </div>
      <Separator />
      <h1
        className={cn(
          "text-[#5A5A5A] text-left w-full pt-5 px-5 font-bold",
          !openSideBar && "hidden"
        )}>
        my projects
      </h1>
      <ScrollArea className="h-[90%] my-2 w-full">
        <div
          className={cn(
            "space-y-3 px-3 flex flex-col transition-all duration-100 ease-out ",
            openSideBar ? "items-start" : "items-center"
          )}>
          {projects &&
            projects.map((project) => (
              <Link
                href={`/my-projects/${project.id}`}
                className={cn(
                  "flex items-center  gap-x-3 hover:bg-gray-sub-100 w-full rounded-md p-2",
                  openSideBar ? "" : "",
                  pathname.includes(project.id) ? "bg-gray-sub-100" : ""
                )}>
                <Image
                  src={project.imageUrl || "/logo.svg"}
                  alt="wallpaper"
                  height={100}
                  width={100}
                  className="rounded object-cover shadow-md h-10 w-10"
                />
                <h1
                  className={cn(
                    "whitespace-nowrap",
                    !openSideBar
                      ? "text-[0px]"
                      : pathname.includes(project.id)
                      ? "text-black font-medium text-base"
                      : "text-[#5A5A5A] text-base"
                  )}>
                  {project.title}
                </h1>
              </Link>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default SideBar;
