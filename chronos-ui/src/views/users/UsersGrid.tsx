import useUsers, { User } from "@/services/Users";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import EditUserAction from "./edit-user/EditUserAction";
import DeleteUserAction from "./delete-user/DeleteUserAction";
import UserRolesCellRenderer from "./UserRolesCellRenderer";
import CreateUserAction from "./create-user/CreateUserAction";
import { Box } from "@mui/material";
import { useSnackbarContext } from "@/contexts/Snacks";

export default function UsersGrid() {
  const { getAll } = useUsers();
  const [rows, setRows] = useState<User[]>([]);
  const { showError } = useSnackbarContext();

  useEffect(() => {
    getAll()
      .then((data) => setRows(data))
      .catch((error) => showError(error.message, "Failed to fetch users"));
  }, []);

  const addRow = (user: User) => {
    setRows((rows) => [...rows, user]);
  }

  const updateRow = (user: User) => {
    setRows((rows) =>
      rows.map((row) => (row.id === user.id ? { ...row, ...user } : row))
    );
  }

  const deleteRow = (userId: number) => {
    setRows((rows) => rows.filter((row) => row.id !== userId));
  }

  const columns: GridColDef<User>[] = [
    {
      field: "id",
      headerName: "Id",
      width: 90,
    },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "zip",
      headerName: "Zip",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <UserRolesCellRenderer user={params.row} onUserUpdate={updateRow} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <>
          <EditUserAction user={params.row} onUserUpdate={updateRow} />
          <DeleteUserAction user={params.row} onUserDelete={deleteRow} />
        </>
      ),
    },
  ];

  const getRowHeight = useCallback(() => "auto", []);
  const getEstimatedRowHeight = useCallback(() => 200, []);

  return (
    <>
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        getRowHeight={getRowHeight}
        getEstimatedRowHeight={getEstimatedRowHeight}
      />

      <Box sx={{ marginTop: 2 }} />
      <CreateUserAction onUserCreate={addRow} />
    </>
  );
}
