import { User, UserResponse, UsersResponse, DeleteResponse } from "../types";
import * as API from "../api/Api";

export const getByUserId = async (id: string) => {
  return (await API.get(`users/${id}`)) as UserResponse;
};

export const createNewUser = async (user: User | null) => {
  return (await API.post(`users`, user)) as UserResponse;
};

export const getAllUsers = async (currentPage: number) => {
  return (await API.get(`users?page=${currentPage}&limit=5`)) as UsersResponse;
};

export const deleteUser = async (id: string) => {
  return (await API.deleteRequest(`users/${id}`)) as DeleteResponse;
};

export const updateUser = async (id: string, user: User | null) => {
  return (await API.put(`users/${id}`, user)) as UserResponse;
};
