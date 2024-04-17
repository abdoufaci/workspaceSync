"use client";

import { getMembersByUsername } from "@/actions/mutations/user-actions/getMembersByUsername";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserChatCard from "./UserChatCard";
import ProjectCard from "./ProjectCard";
import { ArrowLeft } from "lucide-react";

export default function ChatSearch({ chats, projects }: any) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
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
    setSearchMode(false);
  };

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2 items-center">
        {searchMode && (
          <ArrowLeft
            className="rounded-full hover:bg-gray-sub-100 w-[35px] h-[35px] p-[6px]"
            onClick={closeAndClear}
          />
        )}
        <Input
          onFocus={() => setSearchMode(true)}
          className="w-[calc(100%-16px)]"
          placeholder="Search for employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ScrollArea className="h-full pr-3">
        {searchMode ? (
          isSearching ? (
            <p>Searching...</p>
          ) : employees?.length === 0 ? (
            <div className="mt-4 text-neutral-400">No employees found.</div>
          ) : (
            <div className="flex flex-col gap-y-2">
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
              <Link
                key={chat.users[0].id}
                href={`/messages/${chat.users[0].id}`}
              >
                <UserChatCard otherUser={chat.users[0]} />
              </Link>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
