"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@uidotdev/usehooks";
import { getMembersByUsername } from "@/actions/mutations/user-actions/getMembersByUsername";
import { User } from "@prisma/client";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ClientProps {
  isModalOpen: boolean;
  onClose: () => void;
  form?: any;
  field?: any;
}

export const Client = ({ isModalOpen, onClose, field }: ClientProps) => {
  const [clients, setClients] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchUsers = async () => {
      setClients([]);
      setIsSearching(true);
      const clients = await getMembersByUsername({
        role: "CLIENT",
        debouncedSearchTerm,
      });
      setIsSearching(false);

      setClients(clients);
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
            Client
          </DialogTitle>
        </DialogHeader>
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
          ) : clients?.length === 0 ? (
            <div className="mt-4 text-neutral-400">No clients found.</div>
          ) : (
            <div className="flex flex-col gap-y-2">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex flex-col"
                >
                  {clients?.map((client: any) => (
                    <FormItem key={client.id}>
                      <div
                        key={client.id}
                        className="flex items-center justify-between bg-gray-sub-100 rounded-lg p-2 gap-x-2 w-full"
                      >
                        <FormLabel className="font-normal">
                          <div className="flex items-center gap-x-2">
                            <Image
                              alt="avatar"
                              src={client.imageUrl || "/avatar.png"}
                              height={100}
                              width={100}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            {client.firstName}
                          </div>
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem
                            value={client}
                            onClick={closeAndClear}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
