"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CircleFadingPlus } from "lucide-react";
import {
  Dispatch,
  ElementRef,
  FormEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";

interface AddTaskTitlesProps {
  form: any;
  field: any;
  setTitles: Dispatch<
    SetStateAction<
      {
        bgColor: string;
        title: string;
      }[]
    >
  >;
  titles: {
    bgColor: string;
    title: string;
  }[];
}

export function AddTaskTitles({
  field,
  form,
  setTitles,
  titles,
}: AddTaskTitlesProps) {
  const [show, setShow] = useState(false);
  const titleRef = useRef<ElementRef<"input">>(null);

  const bgColors = ["#FFDEDE", "#EDFFDE", "#DEFFF7", "#DEEDFF", "#FEDEFF"];

  const addTitle = () => {
    console.log({
      titleRef,
    });
    setTitles([
      ...titles,
      {
        title: titleRef.current?.value || "",
        bgColor: bgColors[Math.floor(Math.random() * bgColors.length)],
      },
    ]);
    setShow(false);
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="stats"
          render={() => (
            <FormItem className="flex items-start gap-3">
              <FormLabel className="whitespace-nowrap text-gray-sub-300 text-lg">
                Titles:
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-3 gap-5 w-fit">
                  {titles.map((title, idx) => {
                    const check = () => {
                      for (let i = 0; i < field.value.title.length; i++) {
                        if (field.value.title[i].title === title.title)
                          return true;
                      }
                      return false;
                    };
                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <Checkbox
                          className="w-4 h-4 rounded-full flex justify-center items-center ml-3"
                          checked={check()}
                          onCheckedChange={(checked) => {
                            checked
                              ? field.onChange({
                                  priority: field.value.priority,
                                  title: [...field.value.title, title],
                                })
                              : field.onChange({
                                  priority: field.value.priority,
                                  title: field.value?.title?.filter(
                                    (value: any) => value.title !== title.title
                                  ),
                                });
                          }}
                        />
                        <div
                          style={{
                            backgroundColor: title.bgColor,
                          }}
                          className="p-2 px-4 rounded-full w-fit whitespace-nowrap">
                          <h1>{title.title}</h1>
                        </div>
                      </div>
                    );
                  })}
                  {show ? (
                    <form>
                      <Input
                        onBlur={addTitle}
                        ref={titleRef}
                        placeholder="Enter a title..."
                        className="rounded-full pl-4 h-9 max-w-32"
                      />
                    </form>
                  ) : (
                    <CircleFadingPlus
                      color="#1778ff"
                      strokeWidth={1.25}
                      style={{
                        backgroundColor: "#E7F1F8",
                      }}
                      className="rounded-full cursor-pointer"
                      onClick={() => setShow(true)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
