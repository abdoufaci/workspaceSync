"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Priority } from "@prisma/client";
import { Badge } from "@/components/ui/badge";

interface AddTaskPriorityProps {
  form: any;
  field: any;
}

export function AddTaskPriority({ field, form }: AddTaskPriorityProps) {
  return (
    <Form {...form}>
      <div className="space-y-5">
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="stats"
            render={() => (
              <FormItem className="flex items-start gap-3">
                <FormLabel className="whitespace-nowrap text-gray-sub-300 text-lg">
                  Prority :
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(e) =>
                      field.onChange({
                        priority: e,
                        title: field.value.title,
                      })
                    }
                    className="flex flex-col space-y-1">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          checked={field.value.priority === Priority.LOW}
                          value={Priority.LOW}
                          className="text-primary-blue"
                        />
                      </FormControl>
                      <Badge
                        variant={"paused"}
                        className="rounded-full font-normal">
                        {Priority.LOW}
                      </Badge>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          checked={field.value.priority === Priority.MEDIUM}
                          value={Priority.MEDIUM}
                          className="text-primary-blue"
                        />
                      </FormControl>
                      <Badge
                        variant={"pending"}
                        className="rounded-full font-normal">
                        {Priority.MEDIUM}
                      </Badge>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          checked={field.value.priority === Priority.HIGH}
                          value={Priority.HIGH}
                          className="text-primary-blue"
                        />
                      </FormControl>
                      <Badge
                        variant={"high"}
                        className="rounded-full font-normal">
                        {Priority.HIGH}
                      </Badge>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </div>
    </Form>
  );
}
