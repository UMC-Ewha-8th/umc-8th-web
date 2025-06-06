// hooks/api.ts
import {
  RequestLpDto,
  ResponseLpDto,
  ResponseLpListDto,
  ResponseLikeLpDto,
} from "../types/lp";
import axios from "axios";
import { axiosInstance } from "./axios";

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

export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};
