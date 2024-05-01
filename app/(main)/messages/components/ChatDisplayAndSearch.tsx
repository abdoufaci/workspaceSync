"use client";

import { getMembersByUsername } from "@/actions/mutations/user-actions/getMembersByUsername";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserChatCard from "./UserChatCard";
import ProjectCard from "./ProjectCard";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getMembers } from "@/actions/mutations/user-actions/getMembers";

export default function ChatDisplayAndSearch({
  currentUser,
  chats,
  projects,
}: any) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchUsers = async () => {
      setEmployees([]);
      setIsSearching(true);
      const employees = await getMembers({
        userId: currentUser.id,
        userRole: currentUser.role,
        debouncedSearchTerm,
      });
      setIsSearching(false);

      setEmployees(employees);
    };

    fetchUsers();
  }, [debouncedSearchTerm]);

  const closeAndClear = () => {
    setSearchTerm("");
    setSearchMode(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      {currentUser.role != "CLIENT" && (
        <div className="flex gap-x-1 justify-center items-center">
          {searchMode && (
            <ArrowLeft
              className="rounded-full hover:cursor-pointer hover:bg-gray-sub-100 w-[28px] h-[28px] p-[4px]"
              onClick={closeAndClear}
            />
          )}
          <Input
            onFocus={() => setSearchMode(true)}
            className="w-[calc(100%)]"
            placeholder="Search for employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <ScrollArea className="h-full px-2">
        {searchMode ? (
          isSearching ? (
            <p className="p-2 text-sm text-neutral-400">Searching...</p>
          ) : employees?.length === 0 ? (
            <div className="p-2 text-sm text-neutral-600">
              No employees found.
            </div>
          ) : (
            <div>
              {employees?.map((employee) => (
                <Link key={employee.id} href={`/messages/${employee.id}`}>
                  <UserChatCard otherUser={employee} />
                </Link>
              ))}
            </div>
          )
        ) : (
          <div>
            {projects.map((project: any) => (
              <Link key={project.id} href={`/messages/groupe/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            ))}
            {chats.map((chat: any) => (
              <Link key={chat.id} href={`/messages/${chat.id}`}>
                <UserChatCard otherUser={chat} />
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
