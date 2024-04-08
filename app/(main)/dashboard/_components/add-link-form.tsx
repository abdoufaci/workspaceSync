"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleFadingPlus } from "lucide-react";
import Image from "next/image";
import { ElementRef, useRef, useState } from "react";

interface AddLinkFormProps {
  form: any;
  field: any;
}

function AddLinkForm({ field, form }: AddLinkFormProps) {
  const titleRef = useRef<ElementRef<"input">>(null);
  const linkRef = useRef<ElementRef<"input">>(null);

  const addLink = () => {
    if (!titleRef.current?.value || !linkRef.current?.value) return;
    field?.onChange([
      ...field?.value,
      {
        title: titleRef.current?.value,
        link: linkRef.current?.value,
      },
    ]);
    titleRef.current!.value = "";
    linkRef.current!.value = "";
  };

  return (
    <div className="space-y-3">
      <h1 className="font-medium text-secondary-1 text-xl">Links</h1>
      {field.value.map((item: any, idx: boolean) => (
        <div className="flex items-center gap-x-3">
          <div className="flex underline h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#00000088] disabled:cursor-not-allowed disabled:opacity-50">
            {item.title}
          </div>
          <div className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-[#00000088] disabled:cursor-not-allowed disabled:opacity-50">
            {item.link}
          </div>
          <Image
            onClick={() =>
              field.onChange(
                field.value.filter(
                  (currfield: { link: string; title: string }) =>
                    currfield.link != item.link
                )
              )
            }
            alt="trash"
            src={"/trash.svg"}
            height={40}
            width={40}
            role="button"
            className="w-14"
          />
        </div>
      ))}
      <div>
        <FormField
          control={form.control}
          name="links"
          render={() => (
            <FormItem className="w-full flex items-center gap-x-3">
              <Input ref={titleRef} placeholder="Enter a title..." />
              <Input
                ref={linkRef}
                className="flex-grow !m-0"
                placeholder="Enter the link..."
              />
              <CircleFadingPlus
                onClick={addLink}
                style={{
                  backgroundColor: "#E7F1F8",
                  width: "fit",
                  height: "fit",
                }}
                role="button"
                color="#1778ff"
                className="rounded-full w-14 flex items-center justify-center text-[#1778ff]"
              />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default AddLinkForm;
