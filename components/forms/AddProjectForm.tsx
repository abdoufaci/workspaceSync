"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Stat, Step } from "@prisma/client";

import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { useState } from "react";
import Image from "next/image";
import { CircleFadingPlus, CircleMinus, TrashIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { DatePickerWithRange } from "@/app/(main)/my-projects/components/DatePickerWithRange";
import { AssignTo } from "@/app/(main)/my-projects/components/AssignTo";
import { TeamLeader } from "@/app/(main)/my-projects/components/TeamLeader";
import { Client } from "@/app/(main)/my-projects/components/Client";
import { addProject } from "@/actions/mutations/project-actions/addProject";
import { FileUpload } from "../FileUpload";

export const AddProjectFormSchema = z.object({
  image: z.string().optional(),
  title: z.string().min(1, { message: "This field has to be filled." }),
  description: z.string(),
  assignTo: z
    .array(z.any())
    .nonempty({ message: "You have to select at least one employee." }),
  teamLeader: z.any(),
  client: z.any(),
  timeline: z.object({
    from: z.date(),
    to: z.date(),
  }),
  stat: z.enum([Stat.notStarted, Stat.inProgress, Stat.completed]),
  steps: z.array(z.any()).nonempty(),
  projectDetails: z.string(),
});

export function AddProjectForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const AssignToModalClose = () => {
    setIsModalOpen(false);
  };
  const [isTeamLeaderModalOpen, setIsTeamLeaderModalOpen] = useState(false);
  const TeamLeaderModalClose = () => {
    setIsTeamLeaderModalOpen(false);
  };
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const ClientModalClose = () => {
    setIsClientModalOpen(false);
  };

  const [value, setValue] = useState("");

  const { mutate: addProjectMutation, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AddProjectFormSchema>) =>
      addProject(data),
    onSuccess(data) {
      toast.success("project added successfully");
    },
    onError(e) {
      console.log(e.message);
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  const { onClose } = useModal();
  const form = useForm<z.infer<typeof AddProjectFormSchema>>({
    resolver: zodResolver(AddProjectFormSchema),
    defaultValues: {
      assignTo: [],
      steps: [],
    },
  });

  async function onSubmit(data: z.infer<typeof AddProjectFormSchema>) {
    addProjectMutation(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Project Image</FormLabel>
              <FormControl>
                <div>
                  <FileUpload value={field.value} onChange={field.onChange} />
                </div>
              </FormControl>
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
                    className="flex items-center gap-x-2 p-1 rounded-full bg-gray-200 w-fit"
                  >
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
          name="teamLeader"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-1 flex-wrap items-center">
                <FormLabel className="text-gray-sub-300">
                  Team Leader :
                </FormLabel>
                {field.value ? (
                  <div className="flex items-center gap-x-2 p-1 rounded-full bg-gray-200 w-fit">
                    <Image
                      alt="avatar"
                      src={field.value.imageUrl || "/avatar.png"}
                      height={100}
                      width={100}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    {field.value.firstName}
                    <CircleMinus
                      role="button"
                      color="#1778ff"
                      strokeWidth={1.25}
                      style={{
                        backgroundColor: "#E7F1F8",
                      }}
                      className="rounded-full"
                      onClick={() => {
                        field.onChange(null);
                      }}
                    />
                  </div>
                ) : (
                  <CircleFadingPlus
                    role="button"
                    color="#1778ff"
                    strokeWidth={1.25}
                    style={{
                      backgroundColor: "#E7F1F8",
                    }}
                    className="rounded-full"
                    onClick={() => {
                      setIsTeamLeaderModalOpen(true);
                    }}
                  />
                )}
              </div>
              <TeamLeader
                isModalOpen={isTeamLeaderModalOpen}
                onClose={TeamLeaderModalClose}
                field={field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex gap-1 flex-wrap items-center">
                <FormLabel className="text-gray-sub-300">Client :</FormLabel>
                {field.value ? (
                  <div className="flex items-center gap-x-2 p-1 rounded-full bg-gray-200 w-fit">
                    <Image
                      alt="avatar"
                      src={field.value.imageUrl || "/avatar.png"}
                      height={100}
                      width={100}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    {field.value.firstName}
                    <CircleMinus
                      role="button"
                      color="#1778ff"
                      strokeWidth={1.25}
                      style={{
                        backgroundColor: "#E7F1F8",
                      }}
                      className="rounded-full"
                      onClick={() => {
                        field.onChange(null);
                      }}
                    />
                  </div>
                ) : (
                  <CircleFadingPlus
                    role="button"
                    color="#1778ff"
                    strokeWidth={1.25}
                    style={{
                      backgroundColor: "#E7F1F8",
                    }}
                    className="rounded-full"
                    onClick={() => {
                      setIsClientModalOpen(true);
                    }}
                  />
                )}
              </div>
              <Client
                isModalOpen={isClientModalOpen}
                onClose={ClientModalClose}
                field={field}
              />
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
          name="stat"
          render={({ field }) => (
            <FormItem className="flex items-center gap-x-2 w-full">
              <FormLabel className="text-gray-sub-300">Stat :</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} className="flex">
                  <div
                    className={`flex items-center rounded-full border ${
                      field.value === "notStarted" && "border-[#00000088]"
                    }`}
                  >
                    <RadioGroupItem
                      value="notStarted"
                      id="r1"
                      className="hidden"
                    />
                    <Label htmlFor="r1">
                      <Badge variant="notStarted" className="rounded-full">
                        Not Started
                      </Badge>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center rounded-full border ${
                      field.value === "inProgress" && "border-[#00000088]"
                    }`}
                  >
                    <RadioGroupItem
                      value="inProgress"
                      id="r2"
                      className="hidden"
                    />
                    <Label htmlFor="r2">
                      <Badge variant="pending" className="rounded-full">
                        In Progress
                      </Badge>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center rounded-full border ${
                      field.value === "completed" && "border-[#00000088]"
                    }`}
                  >
                    <RadioGroupItem
                      value="completed"
                      id="r3"
                      className="hidden"
                    />
                    <Label htmlFor="r3">
                      <Badge variant="completed" className="rounded-full">
                        Completed
                      </Badge>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Steps :</FormLabel>
              {field.value.map((step: Step) => (
                <div key={step.title} className="flex items-center gap-x-3">
                  <div className="flex p-2 border rounded-lg w-[160px] items-center justify-between">
                    <label
                      htmlFor={step.title}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {step.title}
                    </label>
                    <Checkbox
                      className="w-6 h-6 rounded-full flex justify-center items-center"
                      id={step.title}
                      checked={step.completed}
                      onClick={() => {
                        field.onChange(
                          field.value.map((stp: Step) => {
                            if (stp.title === step.title) {
                              stp.completed = !step.completed;
                            }
                            return stp;
                          })
                        );
                      }}
                    />
                  </div>
                  <TrashIcon
                    onClick={() =>
                      field.onChange(
                        field.value?.filter(
                          (stp: Step) => stp.title !== step.title
                        )
                      )
                    }
                    className="h-5 w-5 p-[3px] outline-dashed outline-2 text-red-500 bg-red-300 rounded-full"
                    role="button"
                  />
                </div>
              ))}
              <div className="flex items-center gap-x-2">
                <Input
                  placeholder="Step Name"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-[160px]"
                ></Input>
                <CircleFadingPlus
                  role="button"
                  color="#1778ff"
                  strokeWidth={1.25}
                  style={{
                    backgroundColor: "#E7F1F8",
                  }}
                  className="rounded-full ml-[1px]"
                  onClick={() => {
                    field.onChange([
                      ...field.value,
                      {
                        title: value,
                        completed: false,
                      },
                    ]);
                    setValue("");
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="projectDetails"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">
                Project Details
              </FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          variant={"blue"}
          className="text-white w-full py-6 rounded-lg"
        >
          Add Project
        </Button>
      </form>
    </Form>
  );
}
