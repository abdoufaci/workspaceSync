"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Role } from "@prisma/client";
import { CircleFadingPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MembersHeaderProps {
  isClient: boolean;
}

function MembersHeader({ isClient }: MembersHeaderProps) {
  const { onOpen } = useModal();
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <h1 className="text-lg font-semibold text-[#191919] ">
          {isClient ? "Clients" : "Employees"}
        </h1>
        <CircleFadingPlus
          role="button"
          color="#1778ff"
          strokeWidth={1.25}
          style={{
            backgroundColor: "#E7F1F8",
          }}
          className="rounded-full"
          onClick={() =>
            onOpen("inviteUser", {
              role: isClient ? Role.CLIENT : Role.EMPLOYEE,
            })
          }
        />
      </div>
      <div className="flex items-center gap-x-5">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              <SelectItem value="apple">January</SelectItem>
              <SelectItem value="banana">February</SelectItem>
              <SelectItem value="blueberry">March</SelectItem>
              <SelectItem value="grapes">April</SelectItem>
              <SelectItem value="pineapple">May</SelectItem>
              <SelectItem value="pineapple">June</SelectItem>
              <SelectItem value="pineapple">July</SelectItem>
              <SelectItem value="pineapple">August</SelectItem>
              <SelectItem value="pineapple">September</SelectItem>
              <SelectItem value="pineapple">October</SelectItem>
              <SelectItem value="pineapple">November</SelectItem>
              <SelectItem value="pineapple">December</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default MembersHeader;
