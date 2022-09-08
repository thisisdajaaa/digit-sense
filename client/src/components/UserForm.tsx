import React from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserFormProps } from "../types";

const UserForm = ({
  mode,
  user,
  handleSubmit,
  handleChange,
}: UserFormProps) => {
  const navigate = useNavigate();

  const handleCancel = () => navigate("/");

  return (
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

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {mode === "add" ? "Save" : "Update"}
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
  );
};

export { UserForm };
