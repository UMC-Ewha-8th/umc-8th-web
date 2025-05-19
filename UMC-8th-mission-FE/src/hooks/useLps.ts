import { useQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";

export const useLps = (sort: "old" | "new") => {
  return useQuery({
    queryKey: ["lpList", sort],
    queryFn: () => fetchLps(sort === "new" ? "desc" : "asc"),
  });
};
