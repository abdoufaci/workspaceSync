"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import Image from "next/image";
import { EmployeeRole } from "@prisma/client";
import { Separator } from "../ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "@/actions/mutations/user-actions/inviteUser";
import { toast } from "sonner";
import { updateUser } from "@/actions/mutations/user-actions/updateUser";
import { useMembersQuery } from "@/hooks/use-query-members";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "fullName must be at least 2 characters.",
    })
    .optional(),
  adress: z
    .string()
    .min(3, {
      message: "Adress must be at least 3 characters.",
    })
    .optional(),
  role: z
    .enum([
      EmployeeRole.DEVELOPER,
      EmployeeRole.MARKETER,
      EmployeeRole.UX_UI_DESIGNER,
    ])
    .optional(),
  desctiption: z
    .string()
    .min(3, {
      message: "Desctiption must be at least 3 characters.",
    })
    .optional(),
});

export const EditMemberModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const { user } = data;
  const [state, setState] = useState(user?.activated ? "working" : "paused");

  const isModalOpen = isOpen && data && type === "editUser";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { refetch } = useMembersQuery(user?.role === "CLIENT");

  useEffect(() => {
    setState(user?.activated ? "working" : "paused");
  }, [user]);

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: ({
      desctiption,
      role,
      adress,
      fullName,
    }: z.infer<typeof formSchema>) =>
      updateUser({
        desctiption,
        employeeRole: role,
        adress,
        fullName,
        userId: user?.id,
      }),
    onSuccess(data) {
      toast.success(`${data.username} updated !`);
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      refetch();
      onClose();
    },
  });

  async function onSubmit({
    adress,
    role,
    desctiption,
    fullName,
  }: z.infer<typeof formSchema>) {
    updateUserMutation({
      adress,
      desctiption,
      fullName,
      role,
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className=" flex flex-col items-start gap-5">
          <DialogTitle className="text-secondary-1 text-2xl font-medium w-full">
            Edit Employee
            <Separator className="w-[70%] mx-auto mt-2 " />
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[600px]">
          <div className="flex items-center space-x-10 w-full">
            <Image
              alt="logo"
              src={user?.imageUrl || "/logo.png"}
              height={200}
              width={200}
              className="h-24 w-24 rounded-full"
            />
            <div className="space-y-2 w-full">
              <h3 className="text-gray-sub-300">Username:</h3>
              <div className="border border-[#E7F1F8] rounded-md p-2 w-full">
                {user?.username}
              </div>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-sub-300">
                      Full name:
                    </FormLabel>
                    <FormControl className="w-full max-w-64">
                      <Input
                        className="focus-visible:ring-0"
                        onChange={field.onChange}
                        ref={field.ref}
                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2 w-full max-w-64">
                <h3 className="text-gray-sub-300">Phone Number:</h3>
                <div className="border border-[#E7F1F8] rounded-md p-2 w-full">
                  {user?.phoneNumber}
                </div>
              </div>
              <FormField
                control={form.control}
                name="adress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-sub-300">Adress:</FormLabel>
                    <FormControl className="w-full max-w-64">
                      <Input
                        className="focus-visible:ring-0"
                        onChange={field.onChange}
                        ref={field.ref}
                        defaultValue={user?.adress || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={
                        user?.employeeRole || EmployeeRole.UX_UI_DESIGNER
                      }>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EmployeeRole.DEVELOPER}>
                          {EmployeeRole.DEVELOPER}
                        </SelectItem>
                        <SelectItem value={EmployeeRole.MARKETER}>
                          {EmployeeRole.MARKETER}
                        </SelectItem>
                        <SelectItem value={EmployeeRole.UX_UI_DESIGNER}>
                          {EmployeeRole.UX_UI_DESIGNER}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-3">
                <h1 className="text-gray-sub-300">State:</h1>
                <div className="flex items-center gap-x-3">
                  <Badge
                    role="button"
                    onClick={() => setState("working")}
                    variant={state === "working" ? "workingState" : "working"}
                    className="rounded-full font-normal">
                    Working
                  </Badge>
                  <Badge
                    role="button"
                    onClick={() => setState("paused")}
                    variant={state === "paused" ? "pausedState" : "paused"}
                    className="rounded-full font-normal">
                    Paused
                  </Badge>
                </div>
              </div>
              <FormField
                control={form.control}
                name="desctiption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-sub-300">
                      Desctiption:
                    </FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        className="focus-visible:ring-0"
                        onChange={field.onChange}
                        ref={field.ref}
                        defaultValue={user?.bio || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  disabled={isPending}
                  type="submit"
                  size="xl"
                  className="w-[90%] mx-auto bg-primary-blue/95 hover:bg-primary-blue m-5">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
