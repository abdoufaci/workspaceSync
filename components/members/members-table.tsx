"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useMembersQuery } from "@/hooks/use-query-members";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/hooks/use-modal-store";
import { Badge } from "../ui/badge";

interface MembersTableProps {
  isClient: boolean;
  allowlistIdentifiers: {
    id: string;
    identifier: string;
  }[];
}

function MembersTable({ isClient, allowlistIdentifiers }: MembersTableProps) {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
  } = useMembersQuery(isClient);

  const [isMounted, setIsMounted] = useState(false);

  const { onOpen, onOpenSelectedMember } = useModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ScrollArea className="w-full h-[92%]">
      <Table>
        <TableCaption>
          {hasNextPage ? (
            <Button
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}>
              Show more
            </Button>
          ) : (
            <h1>You have reached the end.</h1>
          )}
        </TableCaption>

        <TableHeader className="sticky top-0 z-50 bg-white">
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead className="text-right">JoinDate</TableHead>
            <TableHead className="text-right">Projects</TableHead>
            <TableHead className="text-right">Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.pages?.map((page) =>
            page.users.map((user) => {
              let identifierId: string;
              if (allowlistIdentifiers) {
                identifierId = allowlistIdentifiers.filter(
                  (allow) => allow.identifier === user.email
                )[0]?.id;
              }

              return (
                <TableRow
                  onClick={() =>
                    onOpenSelectedMember({
                      user,
                    })
                  }
                  key={user.email}
                  className="text-[#757575] cursor-pointer">
                  <TableCell className="text-black font-semibold flex items-center space-x-2">
                    <Image
                      alt="avatar"
                      src={user.imageUrl || "/avatar.png"}
                      height={100}
                      width={100}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <h1>
                      {!user.activated && user.email}
                      {user.activated && user?.username}
                    </h1>
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {user.activated && user.email}
                    {!user.activated && "-"}
                  </TableCell>
                  <TableCell>{user.activated ? "0659174587" : "-"} </TableCell>
                  <TableCell>
                    {user.activated ? user.createdAt.toLocaleDateString() : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {user.activated ? "projects" : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={`${user.activated ? "working" : "pending"}`}>
                      {user.activated ? "Working" : "Pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right flex justify-end gap-5 transform translate-y-[-25%]">
                    <Trash
                      type="submit"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        onOpen("removeUser", {
                          user,
                          identifierId,
                        });
                      }}
                      className="h-4 w-4"
                      role="button"
                    />

                    <Edit className="h-4 w-4" role="button" />
                  </TableCell>
                </TableRow>
              );
            })
          )}
          {isFetchingNextPage && <MembersTable.Skeleton />}
        </TableBody>
        {isLoading && (
          <TableBody>
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
            <MembersTable.Skeleton />
          </TableBody>
        )}
      </Table>
    </ScrollArea>
  );
}

export default MembersTable;

MembersTable.Skeleton = function SkeletonMembersTable() {
  return (
    <TableRow className="text-[#757575]">
      <TableCell className="text-black font-semibold flex items-center space-x-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="w-20 h-5" />
      </TableCell>
      <TableCell className="font-medium text-center">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="w-16 h-5" />
      </TableCell>
      <TableCell className="text-right flex justify-end items-start gap-5 transform translate-y-[-25%]">
        <Skeleton className="w-20 h-5" />
      </TableCell>
    </TableRow>
  );
};
