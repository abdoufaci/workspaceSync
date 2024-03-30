import { getEmployees } from "@/actions/queries/getEmployees";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useMembersQuery = () => {
  const fetchMembers = async ({
    pageParam = undefined,
  }: {
    pageParam?: string;
  }) => {
    const members = await getEmployees({ pageParam });

    return members;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["members"],
      queryFn: fetchMembers,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: undefined,
      refetchInterval: false,
    });

  return {
    fetchNextPage,
    data,
    hasNextPage,
    isFetchingNextPage,
  };
};
