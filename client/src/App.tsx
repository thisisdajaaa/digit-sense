import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PrivateRoute } from "./utils/RouteHelper";
import { LoginScreen } from "./pages/Login";
import { DashboardScreen } from "./pages/Dashboard";
import { CreateUserScreen } from "./pages/CreateUser";
import { EditUserScreen } from "./pages/EditUser";
import { ProfileScreen } from "./pages/Profile";

const App = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-user"
            element={
              <PrivateRoute>
                <CreateUserScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/user/:id"
            element={
              <PrivateRoute>
                <EditUserScreen />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
