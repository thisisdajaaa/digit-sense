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
import { Pagination } from "../components/Pagination";
import { User } from "../types";
import { deleteUser, getAllUsers } from "../services";

const DashboardScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [activePage, setActivePage] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const navigate = useNavigate();

  const handleFetchUsers = useCallback(async () => {
    try {
      const currentPage = activePage === 0 ? 1 : activePage + 1;
      const { data, totalCount, success } = await getAllUsers(currentPage);

      if (success) {
        setUsers(data);
        setTotalCount(totalCount);
      }
    } catch (error) {
      console.log(error);
    }
  }, [activePage]);

  useEffect(() => {
    handleFetchUsers();
  }, [handleFetchUsers]);

  const handleEditUser = (id?: string) => {
    if (!id) return;

    navigate(`/user/${id}`);
  };
  const handleCreateUser = () => navigate("/create-user");

  const handleDeleteUser = async (id?: string) => {
    if (!id) return;

    try {
      const { success } = await deleteUser(id);

      if (success) handleFetchUsers();
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
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.age}</TableCell>
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
