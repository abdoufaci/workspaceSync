"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { inviteUser } from "@/actions/mutations/user-actions/inviteUser";
import { useModal } from "@/hooks/use-modal-store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Role } from "@prisma/client";
import { useMembersQuery } from "@/hooks/use-query-members";

interface InviteFormProps {
  role?: Role;
}

export const InviteUserformSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  role: z.enum([Role.CLIENT, Role.EMPLOYEE, Role.MANAGER]).optional(),
});

export function InviteForm({ role }: InviteFormProps) {
  const { refetch } = useMembersQuery(role === "CLIENT");

  const { mutate: inviteUserMutation, isPending } = useMutation({
    mutationFn: ({ email, role }: z.infer<typeof InviteUserformSchema>) =>
      inviteUser({
        email,
        role,
      }),
    onSuccess(data) {
      toast.success("user invited successfully");
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      refetch();
      onClose();
    },
  });

  const { onClose } = useModal();
  const form = useForm<z.infer<typeof InviteUserformSchema>>({
    resolver: zodResolver(InviteUserformSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({
    email,
    role,
  }: z.infer<typeof InviteUserformSchema>) {
    inviteUserMutation({
      email,
      role,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          onSubmit({
            email: data.email,
            role,
          })
        )}
        className="space-y-8 flex flex-col justify-center items-center">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-gray-sub-300 focus-visible:ring-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
          variant={"blue"}
          className="text-white w-[115px]">
          Invite
        </Button>
      </form>
    </Form>
  );
}
