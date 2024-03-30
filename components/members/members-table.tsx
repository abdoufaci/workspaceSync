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

function MembersTable() {
  const {
    data: users,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMembersQuery();

  return (
    <Table>
      {hasNextPage && (
        <TableCaption>
          <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
            Show more
          </Button>
        </TableCaption>
      )}

      <TableHeader>
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
          page.users.map((user) => (
            <TableRow key={user.email} className="text-[#757575]">
              <TableCell className="text-black font-semibold flex items-center space-x-2">
                <Image
                  alt="avatar"
                  src={user.imageUrl || "/logo.png"}
                  height={100}
                  width={100}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h1>
                  {user.firstName} {user.lastName}
                </h1>
              </TableCell>
              <TableCell className="font-medium text-center">
                {user.email}
              </TableCell>
              <TableCell>0659174587</TableCell>
              <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">projects</TableCell>
              <TableCell className="text-right">status</TableCell>
              <TableCell className="text-right flex justify-end items-start gap-5 transform translate-y-[-25%]">
                <Trash className="h-4 w-4" role="button" />
                <Edit className="h-4 w-4" role="button" />
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}

export default MembersTable;
