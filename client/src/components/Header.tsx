import React from "react";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import * as API from "../api/Api";
import { useNavigate } from "react-router-dom";

export type HeaderProps = {
  pageTitle: string;
};

const Header = ({ pageTitle }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.get("auth/logout");
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfile = () => navigate("/profile");

  return (
    <AppBar
      position="absolute"
      color="default"
      elevation={0}
      sx={{
        position: "relative",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          {pageTitle}
        </Typography>

        <Button color="inherit" onClick={handleProfile}>
          Profile
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
