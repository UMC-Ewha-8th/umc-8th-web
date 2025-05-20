import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import { ResponseLpListDto } from "../types/lp";

export const useLps = (sort: "new" | "old") => {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: ["lps", sort],
    queryFn: ({ pageParam = 0 }) =>
      fetchLps({
        order: sort === "new" ? "desc" : "asc",
        pageParam: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) {
        return lastPage.data.nextCursor;
      }
      return undefined;
    },
  });
};
