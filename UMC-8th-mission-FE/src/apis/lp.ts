import { ResponseLpListDto } from "../types/lp";
import axios from "axios";

export const fetchLps = async (
  order: "asc" | "desc",
  cursor: number = 0
): Promise<ResponseLpListDto> => {
  const response = await axios.get<ResponseLpListDto>(
    "http://localhost:8000/v1/lps",
    {
      params: {
        order,
        cursor,
        limit: 10,
      },
    }
  );
  return response.data;
};
