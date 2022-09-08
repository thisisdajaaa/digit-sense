import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Avatar, Box, Button, Grid, Link, Typography } from "@mui/material";
import { Layout } from "../components/Layout";
import * as API from "../api/Api";
import { User, UserResponse } from "../types";
import { uploadAvatar } from "../services";

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputFileRef.current?.click();

  const handleFetchLoggedInUser = useCallback(async () => {
    try {
      const response = (await API.get("auth/currentUser")) as UserResponse;

      if (response.success) setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    handleFetchLoggedInUser();
  }, [handleFetchLoggedInUser]);

  const handleOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const newImages = event.target?.files;

      if (newImages) {
        try {
          const { success } = await uploadAvatar(newImages);

          if (success) handleFetchLoggedInUser();
        } catch (error) {
          console.log(error);
        }
      }
    },
    [handleFetchLoggedInUser]
  );

  const profilePicture = useMemo(
    () =>
      user?.avatar && user?.avatar !== "no-photo.jpg"
        ? `${process.env.REACT_APP_API_URL}/uploads/${user?.avatar}`
        : `${process.env.REACT_APP_API_URL}/uploads/noimg.jpg`,
    [user]
  );

  return (
    <Layout pageTitle="Profile">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Link underline="hover" color="inherit" href="/">
          Dashboard
        </Link>
      </Box>

      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Avatar
              alt="Remy Sharp"
              src={profilePicture}
              sx={{ width: 156, height: 156 }}
            />

            <input
              ref={inputFileRef}
              accept="image/*"
              hidden
              id="avatar-image-upload"
              type="file"
              onChange={handleOnChange}
            />
            <label htmlFor="avatar-image-upload">
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={handleClick}
                sx={{ mt: 3, mb: 2 }}
              >
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" variant="h6">
              Email: {user?.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" variant="h6">
              Full Name: {user?.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" variant="h6">
              Age: {user?.age}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component="p" variant="h6">
              Age: {user?.address}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export { ProfileScreen };
