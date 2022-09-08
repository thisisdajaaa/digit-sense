import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { User } from "../types";
import { createNewUser } from "../services";
import { UserForm } from "../components/UserForm";

const CreateUserScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const handleChange =
    (key: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const DEFAULT_PASSWORD = "123456";

    const createUserRequest = {
      ...user,
      password: DEFAULT_PASSWORD,
    };

    try {
      const { success } = await createNewUser(createUserRequest);

      if (success) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout pageTitle="Edit User">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create User
        </Typography>

        <UserForm
          mode="add"
          user={user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Layout>
  );
};

export { CreateUserScreen };
