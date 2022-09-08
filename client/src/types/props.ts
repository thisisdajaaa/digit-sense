import React from "react";
import { User } from "./models";

export type HeaderProps = {
  pageTitle: string;
};

export type PaginationProps = {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
};

export type UserFormProps = {
  mode: "add" | "edit";
  user: User | null;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: (
    key: keyof User
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};
