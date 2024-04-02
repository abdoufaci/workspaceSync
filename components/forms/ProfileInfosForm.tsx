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
import { updateUser } from "@/actions/mutations/user-actions/updateUser";
import { useRouter } from "next/navigation";
import { EmployeeRole, User } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface ProfileInfosFormProps {
  user: User | null;
}

const formSchema = z.object({
  adress: z.string().min(2, {
    message: "firstName must be at least 2 characters.",
  }),
  role: z.enum([
    EmployeeRole.DEVELOPER,
    EmployeeRole.MARKETER,
    EmployeeRole.UX_UI_DESIGNER,
  ]),
});

export function ProfileInfosForm({ user }: ProfileInfosFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adress: "",
      role: EmployeeRole.UX_UI_DESIGNER,
    },
  });

  const { mutate: updateUserMutation, isPending } = useMutation({
    mutationFn: async ({ adress, role }: z.infer<typeof formSchema>) =>
      await updateUser({
        userId: user?.id,
        role,
        adress,
      }),

    onSuccess() {
      router.push("/");
    },
    onError() {
      toast.error("Something went wrong.");
    },
  });

  async function onSubmit({ adress, role }: z.infer<typeof formSchema>) {
    updateUserMutation({
      adress,
      role,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
        <div className="space-y-8">
          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adress</FormLabel>
                <FormControl>
                  <Input className="focus-visible:ring-0" {...field} />
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
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={EmployeeRole.DEVELOPER}>
                      {EmployeeRole.DEVELOPER}
                    </SelectItem>
                    <SelectItem value="apple">
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
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="w-[90%] mx-auto absolute bottom-7 left-[50%] transform translate-x-[-50%] bg-primary-blue/95 hover:bg-primary-blue text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}
