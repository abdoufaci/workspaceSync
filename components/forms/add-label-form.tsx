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
import { Card, Role, User } from "@prisma/client";
import { useMembersQuery } from "@/hooks/use-query-members";
import { FileUpload } from "../FileUpload";
import { addLabel } from "@/actions/mutations/dashboard-actions/addLabel";

export const AddLabelFormSchema = z.object({
  file: z.string().min(1, { message: "This field has to be filled." }),
  title: z.string().min(1),
});

interface AddLabelFormProps {
  task?: Card & {
    assignedTo: User[];
  } & {
    creator: {
      imageUrl: string | null;
      username: string | null;
    };
  };
}

export function AddLabelForm({ task }: AddLabelFormProps) {
  const { mutate: addLabelMutation, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof AddLabelFormSchema>) =>
      addLabel(data, task),
    onSuccess(data) {
      console.log({ data });
      toast.success("user invited successfully");
    },
    onError() {
      toast.error("Something went wrong.");
    },
    onSettled() {
      onClose();
    },
  });

  const { onClose } = useModal();
  const form = useForm<z.infer<typeof AddLabelFormSchema>>({
    resolver: zodResolver(AddLabelFormSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AddLabelFormSchema>) {
    addLabelMutation(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col justify-center items-center">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Title</FormLabel>
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
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-gray-sub-300">Label File</FormLabel>
              <FormControl>
                <div>
                  <FileUpload
                    endpoint="labelFile"
                    value={field.value}
                    onChange={field.onChange}
                  />
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
          className="text-white w-full rounded-md">
          Add Label
        </Button>
      </form>
    </Form>
  );
}
