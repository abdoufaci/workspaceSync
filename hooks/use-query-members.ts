import { getMembers } from "@/actions/queries/getMembers";
import { Role } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMembersQuery = (isClient: boolean) => {
  const fetchMembers = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const members = await getMembers({
      pageParam,
      role: isClient ? Role.CLIENT : Role.EMPLOYEE,
    });

    return members;
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["members"],
    queryFn: fetchMembers,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    initialPageParam: undefined,
    refetchInterval: false,
  });

  return {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isLoadingError,
    refetch,
  };
};
