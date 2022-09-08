import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Layout } from "../components/Layout";
import * as API from "../api/Api";
import Pagination from "../components/Pagination";

type User = {
  _id: string;
  name: string;
  email: string;
  address: string;
  age: number;
  avatar?: string;
  createdAt: string;
  __v: number;
};

type UsersResponse = {
  success: boolean;
  count: number;
  totalCount: number;
  pagination: any;
  data: User[];
};

type DeleteResponse = {
  success: boolean;
  data: object;
};

const DashboardScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const navigate = useNavigate();

  const handleFetchUsers = useCallback(async () => {
    try {
      const response = (await API.get(
        `users?page=${activePage === 0 ? 1 : activePage + 1}&limit=5`
      )) as UsersResponse;

      setUsers(response.data);
      setTotalCount(response.totalCount);
    } catch (error) {
      console.log(error);
    }
  }, [activePage]);

  useEffect(() => {
    handleFetchUsers();
  }, [handleFetchUsers]);

  const handleEditUser = (id: string) => navigate(`/user/${id}`);
  const handleCreateUser = () => navigate("/create-user");

  const handleDeleteUser = async (id: string) => {
    try {
      const response = (await API.deleteRequest(
        `users/${id}`
      )) as DeleteResponse;

      if (response.success) handleFetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setActivePage(newPage);
  };

  return (
    <Layout pageTitle="Dashboard">
      <Box height={400} width="100%" mt={4}>
        <Box width="100%" sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateUser}
            sx={{ mt: 3, mb: 2 }}
          >
            Add new user
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableBody>
              {users.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row._id}</TableCell>
                  <TableCell style={{ width: 140 }} align="left">
                    {row.email}
                  </TableCell>
                  <TableCell style={{ width: 140 }} align="left">
                    {row.name}
                  </TableCell>
                  <TableCell style={{ width: 140 }} align="left">
                    {row.address}
                  </TableCell>
                  <TableCell style={{ width: 140 }} align="left">
                    {row.age}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={() => handleEditUser(row._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteUser(row._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[2]}
                  colSpan={3}
                  count={totalCount}
                  rowsPerPage={5}
                  page={activePage}
                  onPageChange={handleChangePage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export { DashboardScreen };
