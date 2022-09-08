import {
  DeleteResponse,
  LoginFormValues,
  LoginResponse,
  UploadResponse,
  UserResponse,
} from "../types";
import * as API from "../api/Api";

export const getCurrentUser = async () => {
  return (await API.get("auth/currentUser")) as UserResponse;
};

export const loginUser = async (request: LoginFormValues) => {
  return (await API.post("auth/login", request)) as LoginResponse;
};

export const uploadAvatar = async (newImages: FileList) => {
  return (await API.upload("auth/uploadAvatar", newImages)) as UploadResponse;
};

export const logout = async () => {
  return (await API.get("auth/logout")) as DeleteResponse;
};
