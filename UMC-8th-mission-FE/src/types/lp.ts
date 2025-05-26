import { CommonResponse } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Likes[];
};

// 중복 타입 제거 (lpId 삭제)

export type CursorBasedResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    data: T;
    nextCursor: number;
    hasNext: boolean;
  };
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = CommonResponse<LP>;

export type ResponseLpListDto = CursorBasedResponse<LP[]>;

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;
