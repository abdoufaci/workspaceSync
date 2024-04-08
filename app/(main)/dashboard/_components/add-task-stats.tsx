"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleFadingPlus } from "lucide-react";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";
import { AddTaskPriority } from "./add-task-priority";

interface AddTaskStatsProps {
  form: any;
  field: any;
}

function AddTaskStats({ field, form }: AddTaskStatsProps) {
  return (
    <div className="space-y-3">
      <h1 className="font-medium text-secondary-1 text-xl">Task Stats</h1>
      <div className="flex items-start gap-3">
        <h1 className="text-gray-sub-300">Prority :</h1>
        <AddTaskPriority />
      </div>
    </div>
  );
}

export default AddTaskStats;
