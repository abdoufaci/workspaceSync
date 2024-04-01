"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { getMembersByUsername } from "@/actions/mutations/user-actions/getMembersByUsername";
import { User } from "@prisma/client";
import Image from "next/image";
import { CircleMinus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface AssignToProps {
  isModalOpen: boolean;
  onClose: () => void;
  form: any;
  field: any;
}

export const AssignTo = ({
  isModalOpen,
  onClose,
  form,
  field,
}: AssignToProps) => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchUsers = async () => {
      setEmployees([]);
      setIsSearching(true);
      const employees = await getMembersByUsername({
        role: "EMPLOYEE",
        debouncedSearchTerm,
      });
      setIsSearching(false);

      setEmployees(employees);
    };

    fetchUsers();
  }, [debouncedSearchTerm]);

  const closeAndClear = () => {
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeAndClear}>
      <DialogContent className="bg-white text-black">
        <DialogHeader className="px-6 py-2">
          <DialogTitle className="text-xl text-center font-bold">
            Assign to
          </DialogTitle>
        </DialogHeader>
        <div className="flex gap-1 flex-wrap">
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
                className="h-7 w-7 rounded-full object-cover"
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
        </div>
        <Input
          className="mt-2 w-[calc(100%-16px)]"
          placeholder="Search for employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ScrollArea className="h-[250px] pr-3">
          {isSearching ? (
            <div className="flex flex-col gap-y-2">
              <div className="flex items-center justify-between bg-gray-100 rounded-lg p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-white" />
                  <Skeleton className="h-4 w-32 bg-white" />
                </div>
                <Skeleton className="w-6 h-6 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-white" />
                  <Skeleton className="h-4 w-32 bg-white" />
                </div>
                <Skeleton className="w-6 h-6 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-white" />
                  <Skeleton className="h-4 w-32 bg-white" />
                </div>
                <Skeleton className="w-6 h-6 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-white" />
                  <Skeleton className="h-4 w-32 bg-white" />
                </div>
                <Skeleton className="w-6 h-6 rounded-full bg-white" />
              </div>
              <div className="flex items-center justify-between bg-gray-100 rounded-md p-2 gap-x-2">
                <div className="flex items-center gap-x-2">
                  <Skeleton className="h-10 w-10 rounded-full bg-white" />
                  <Skeleton className="h-4 w-32 bg-white" />
                </div>
                <Skeleton className="w-6 h-6 rounded-full bg-white" />
              </div>
            </div>
          ) : employees?.length === 0 ? (
            <div className="mt-4 text-neutral-400">No employees found.</div>
          ) : (
            <div className="flex flex-col gap-y-2">
              {employees?.map((employee) => (
                <FormField
                  key={employee.id}
                  control={form.control}
                  name="assignTo"
                  render={() => {
                    const check = () => {
                      for (let i = 0; i < field.value.length; i++) {
                        if (field.value[i].id === employee.id) return true;
                      }
                      return false;
                    };

                    return (
                      <FormItem
                        key={employee.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <div
                          key={employee.id}
                          className="flex items-center justify-between bg-gray-sub-100 rounded-lg p-2 gap-x-2 w-full"
                        >
                          <label htmlFor={employee.id}>
                            <div className="flex items-center gap-x-2">
                              <Image
                                alt="avatar"
                                src={employee.imageUrl || "/avatar.png"}
                                height={100}
                                width={100}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              {employee.firstName}
                            </div>
                          </label>
                          <FormControl>
                            <Checkbox
                              className="w-6 h-6 rounded-full flex justify-center items-center"
                              id={employee.id}
                              checked={check()}
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([...field.value, employee])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: any) => value.id !== employee.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
