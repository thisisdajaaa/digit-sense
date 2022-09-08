export type User = {
  _id?: string;
  name?: string;
  email?: string;
  address?: string;
  age?: number;
  avatar?: string;
  createdAt?: string;
  __v?: number;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type CallConfig = {
  params?: any;
  payload?: any;
  files?: FileList;
};
