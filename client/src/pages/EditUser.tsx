import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { User } from "../types";
import { getByUserId, updateUser } from "../services";
import { UserForm } from "../components/UserForm";

const EditUserScreen = () => {
  const [user, setUser] = useState<User | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const handleFetchUserDetails = useCallback(async () => {
    try {
      const { success, data } = await getByUserId(userId);

      if (success) setUser(data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    handleFetchUserDetails();
  }, [handleFetchUserDetails]);

  const handleChange =
    (key: keyof User) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({
        ...prev,
        [key]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { success } = await updateUser(userId, user);

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
          User Details
        </Typography>

        <UserForm
          mode="edit"
          user={user}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Layout>
  );
};

export { EditUserScreen };
