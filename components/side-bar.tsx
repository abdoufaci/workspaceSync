"use client";

import { cn } from "@/lib/utils";
import { sidebarcontent } from "@/side-bar-content";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Separator } from "./ui/separator";

function SideBar() {
  const [openSideBar, setOpenSideBar] = useState(false);

  const pathname = usePathname();

  return (
    <div
      onMouseEnter={() => setOpenSideBar(true)}
      onMouseLeave={() => setOpenSideBar(false)}
      className={cn(
        "border-r overflow-x-hidden flex flex-col items-center gap-x-5 transition-all duration-200 ease-out inset-0",
        openSideBar ? "w-64" : "w-[90px] "
      )}>
      <div
        className={cn(
          "flex text-[#404040] border-b w-full inset-0",
          openSideBar ? "items-center" : "items-center"
        )}>
        <Image
          alt="logo"
          src="/logo.svg"
          height={50}
          width={50}
          className="h-20 w-24 "
        />
        <h1
          className={cn(
            "font-semibold text-xl transition-all duration-300 ease-out",
            openSideBar ? "w-full" : "w-0"
          )}>
          WorkSpaceSync
        </h1>
      </div>
      <div
        className={cn(
          "space-y-4 flex flex-col w-full  transition-all duration-300 ease-out inset-0",
          openSideBar ? "items-start p-8" : "justify-center items-center py-8"
        )}>
        {sidebarcontent.map(({ icon: Icon, title, label }) => (
          <Link
            key={label}
            href={label}
            className={cn(
              "flex items-center p-3 text-secondary-1 w-full inset-0",
              openSideBar ? "gap-x-3 px-7" : "justify-center",
              pathname === label
                ? "bg-gradient-to-r from-[#4f5bd5] justify-center to-[#b224ef] rounded-full text-white w-fit bg-blend-color-burn"
                : "",
              openSideBar && pathname ? "" : ""
            )}>
            {Icon}
            <h1
              className={cn(
                "whitespace-nowrap transition-all duration-100 ease-out",
                openSideBar ? "text-base" : "text-[0px]"
              )}>
              {title}
            </h1>
          </Link>
        ))}
      </div>
      <Separator />
    </div>
  );
}

export default SideBar;
