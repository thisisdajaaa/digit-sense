import { User } from "./models";

type BaseResponse<T> = {
  success: boolean;
} & T;

type NoResponse = BaseResponse<{
  data: object;
}>;

export type UserResponse = BaseResponse<{
  data: User;
}>;

export type UsersResponse = BaseResponse<{
  count: number;
  totalCount: number;
  pagination: any;
  data: User[];
}>;

export type LoginResponse = BaseResponse<{
  token: string;
}>;

export type UploadResponse = BaseResponse<{
  data: string;
}>;

export type DeleteResponse = NoResponse;

export type LogoutResponse = NoResponse;
