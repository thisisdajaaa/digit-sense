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

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   */
  const handleClick = (event: any) => {
    inputFileRef.current?.click();
  };

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
    async (event: any) => {
      const newImage = event.target?.files;

      console.log(newImage);

      if (newImage) {
        await API.upload("auth/uploadAvatar", newImage);
        handleFetchLoggedInUser();
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
