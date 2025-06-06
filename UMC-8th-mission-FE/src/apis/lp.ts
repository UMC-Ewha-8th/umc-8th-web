// hooks/api.ts
import { ResponseLpListDto } from "../types/lp";
import axios from "axios";

export const fetchLps = async ({
  pageParam = 0,
  order = "desc",
}: {
  pageParam?: number;
  order?: "asc" | "desc";
}): Promise<ResponseLpListDto> => {
  const response = await axios.get<ResponseLpListDto>(
    "http://localhost:8000/v1/lps",
    {
      params: {
        order,
        cursor: pageParam,
      },
    }
  );
  return response.data;
};
