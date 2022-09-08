import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import * as API from "../api/Api";

type User = {
  _id?: string;
  name?: string;
  email?: string;
  address?: string;
  age?: number;
  avatar?: string;
  createdAt?: string;
  __v?: number;
};

type UserResponse = {
  success: boolean;
  data: User;
};

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

    try {
      const response = (await API.post(`users`, {
        password: DEFAULT_PASSWORD,
        ...user,
      })) as UserResponse;

      if (response.success) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => navigate("/");

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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            onChange={handleChange("name")}
            autoComplete="name"
            value={user?.name || ""}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            onChange={handleChange("email")}
            value={user?.email || ""}
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="address"
            label="Address"
            id="address"
            onChange={handleChange("address")}
            value={user?.address || ""}
            autoComplete="address"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="age"
            label="Age"
            type="number"
            id="age"
            onChange={handleChange("age")}
            value={user?.age || 0}
            autoComplete="age"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="inherit"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export { CreateUserScreen };
