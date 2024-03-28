"use client";

import { removeUser } from "@/actions/mutations/user-actions/removeUser";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function UserCard({ identifierId, identifier, email }: any) {
  const { mutate: removeUserMutation, isPending } = useMutation({
    mutationFn: () => removeUser({ identifierId, identifier }),
  });

  const handleClick = async () => {
    try {
      removeUserMutation();
      toast.success("user removed successfully");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex gap-x-2 items-center py-2">
      {identifier}

      {identifier === email ? (
        <Badge className="p-2 bg-blue-700 hover:bg-blue-700 text-base">
          Manager
        </Badge>
      ) : (
        <Button
          disabled={isPending}
          onClick={handleClick}
          variant="destructive"
        >
          {isPending ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            "Remove User"
          )}
        </Button>
      )}
    </div>
  );
}
