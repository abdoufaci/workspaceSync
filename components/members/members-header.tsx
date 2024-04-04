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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface MembersHeaderProps {
  isClient: boolean;
}

const formSchema = z.object({
  month: z.string(),
});

function MembersHeader({ isClient }: MembersHeaderProps) {
  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const selectedMonth = form.watch("month"); // Watch the 'month' field for changes

  useEffect(() => {
    if (selectedMonth) {
      form.handleSubmit(onSubmit)();
    }
  }, [selectedMonth, form.handleSubmit]);

  async function onSubmit({ month }: z.infer<typeof formSchema>) {
    month === "0"
      ? router.push(`/members/${isClient ? "client" : "employee"}`)
      : router.push(
          `/members/${isClient ? "client" : "employee"}?month=${month}`
        );
  }

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-14">
          <FormField
            control={form.control}
            name="month"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Months</SelectLabel>
                      <SelectItem value="0">remove filter</SelectItem>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default MembersHeader;
