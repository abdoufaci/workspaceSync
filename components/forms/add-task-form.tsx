"use client";

import { FileUpload } from "@/components/FileUpload";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleFadingPlus, CircleMinus, X } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AssignTo } from "../../app/(main)/my-projects/components/AssignTo";
import { DatePickerWithRange } from "../../app/(main)/my-projects/components/DatePickerWithRange";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import AddLinkForm from "@/app/(main)/dashboard/_components/add-link-form";
import { Priority } from "@prisma/client";
import { AddTaskPriority } from "@/app/(main)/dashboard/_components/add-task-priority";
import { AddTaskTitles } from "@/app/(main)/dashboard/_components/add-task-titles";
import { Badge } from "../ui/badge";
import { titlesState } from "@/titles";
import { useMutation } from "@tanstack/react-query";
import { AddTask } from "@/actions/mutations/dashboard-actions/addTask";
import { toast } from "sonner";

export const AddTaskFormSchema = z.object({
  image: z.string().optional(),
  title: z.string(),
  description: z.string(),
  assignTo: z
    .array(z.any())
    .nonempty({ message: "You have to select at least one employee." }),
  timeline: z.object({
    from: z.date(),
    to: z.date(),
  }),
  links: z.array(
    z.object({
      link: z.string(),
      title: z.string(),
    })
  ),
  stats: z.object({
    priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH], {
      required_error: "You need to select a notification type.",
    }),
    title: z.array(
      z.object({
        title: z.string(),
        bgColor: z.string(),
      })
    ),
  }),
});

export const variants = {
  LOW: "paused",
  MEDIUM: "pending",
  HIGH: "high",
};

export function AddTaskForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const AssignToModalClose = () => {
    setIsModalOpen(false);
  };

  const { onClose, data } = useModal();

  const { taskType } = data;

  const [titles, setTitles] = useState<
    {
      bgColor: string;
      title: string;
    }[]
  >(titlesState);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AddTaskFormSchema>) =>
      AddTask(data, taskType),
    onSuccess(data) {
      toast.success("task added !");
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  const form = useForm<z.infer<typeof AddTaskFormSchema>>({
    resolver: zodResolver(AddTaskFormSchema),
    defaultValues: {
      assignTo: [],
      links: [],
      stats: {
        priority: "LOW",
        title: [],
      },
    },
  });

  const onSubmit = async (data: z.infer<typeof AddTaskFormSchema>) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center">
        <FormField
          control={form.control}
          name="stats"
          render={({ field }) => (
            <FormItem className="w-full flex flex-wrap items-start gap-2">
              <FormLabel className="text-gray-sub-300 whitespace-nowrap ">
                Task stats :
              </FormLabel>

              <Popover>
                <PopoverTrigger className="!m-0">
                  <CircleFadingPlus
                    color="#1778ff"
                    strokeWidth={1.25}
                    style={{
                      backgroundColor: "#E7F1F8",
                    }}
                    className="rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent className="!w-fit space-y-5 !m-0" side="right">
                  <h1 className="text-2xl w-fit font-medium text-secondary-1">
                    Task stats
                  </h1>
                  <div className="flex items-start gap-20">
                    <AddTaskPriority field={field} form={form} />
                    <AddTaskTitles
                      field={field}
                      form={form}
                      setTitles={setTitles}
                      titles={titles}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <Badge
                //@ts-ignore
                variant={variants[field.value.priority]}
                className="rounded-full font-normal !m-0 py-[3px]">
                <h3 className="text-xs">{field.value.priority}</h3>
              </Badge>
              {field.value.title.map(({ bgColor, title }) => (
                <div
                  style={{
                    backgroundColor: bgColor,
                  }}
                  className="p-1 text-xs px-4 rounded-full w-fit whitespace-nowrap !m-0">
                  <h1>{title}</h1>
                </div>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignTo"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-1 flex-wrap items-center">
                <FormLabel className="text-gray-sub-300">
                  Assigned to :
                </FormLabel>
                {field.value.map((employee: any) => (
                  <div
                    key={employee.id}
                    className="flex items-center gap-x-2 p-1 rounded-full bg-gray-200 w-fit">
                    <Image
                      alt="avatar"
                      src={employee.imageUrl || "/avatar.png"}
                      height={100}
                      width={100}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    {employee.firstName}
                    <CircleMinus
                      role="button"
                      color="#1778ff"
                      strokeWidth={1.25}
                      style={{
                        backgroundColor: "#E7F1F8",
                      }}
                      className="rounded-full"
                      onClick={() => {
                        field.onChange(
                          field.value?.filter(
                            (value: any) => value.id !== employee.id
                          )
                        );
                      }}
                    />
                  </div>
                ))}
                <CircleFadingPlus
                  role="button"
                  color="#1778ff"
                  strokeWidth={1.25}
                  style={{
                    backgroundColor: "#E7F1F8",
                  }}
                  className="rounded-full"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                />
              </div>
              <AssignTo
                isModalOpen={isModalOpen}
                onClose={AssignToModalClose}
                form={form}
                field={field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="links"
          render={({ field }) => (
            <FormItem className="w-full flex items-start gap-x-2">
              <FormLabel className="text-gray-sub-300 whitespace-nowrap ">
                Links :
              </FormLabel>

              <Popover>
                <PopoverTrigger className="!m-0">
                  <CircleFadingPlus
                    color="#1778ff"
                    strokeWidth={1.25}
                    style={{
                      backgroundColor: "#E7F1F8",
                    }}
                    className="rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-full !m-0" side="left">
                  <AddLinkForm field={field} form={form} />
                </PopoverContent>
              </Popover>
              <div className="flex items-start flex-wrap gap-3 w-full !mt-0">
                {field.value.map((item, idx) => (
                  <div className="flex items-center justify-between p-0.5 px-2 w-full rounded max-w-40 bg-gray-200">
                    <h1>{item.title}</h1>
                    <X
                      onClick={() =>
                        field.onChange(
                          field.value.filter(
                            (currfield: { link: string; title: string }) =>
                              currfield.link != item.link
                          )
                        )
                      }
                      className="h-4 w-4 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Timeline</FormLabel>
              <DatePickerWithRange field={field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Task Image</FormLabel>
              <FormControl>
                <div>
                  <FileUpload value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          variant={"blue"}
          className="text-white w-full py-6 rounded-lg">
          Add Task
        </Button>
      </form>
    </Form>
  );
}
