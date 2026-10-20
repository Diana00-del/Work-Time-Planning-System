import useLocations, { Location } from "@/services/Locations";
import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import CreateLocationAction from "./create-location/CreateLocationAction";
import EditLocationAction from "./edit-location/EditLocationAction";
import DeleteLocationAction from "./delete-location/DeleteLocationAction";
import { useSnackbarContext } from "@/contexts/Snacks";

export default function LocationsGrid() {
  const { getAll } = useLocations();
  const [rows, setRows] = useState<Location[]>([]);
  const { showError } = useSnackbarContext();

  useEffect(() => {
    getAll()
      .then((data) => setRows(data))
      .catch((error) => showError(error.message, "Failed to fetch locations"));
  }, []);

  const addRow = (location: Location) => {
    setRows((rows) => [...rows, location]);
  }

  const updateRow = (location: Location) => {
    setRows((rows) =>
      rows.map((row) => (row.id === location.id ? { ...row, ...location } : row))
    );
  }

  const deleteRow = (locationId: number) => {
    setRows((rows) => rows.filter((row) => row.id !== locationId));
  }

  const columns: GridColDef<Location>[] = [
    {
      field: "id",
      headerName: "Id",
      width: 90,
    },
    {
      field: "name",
      headerName: "Name",
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
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Created by",
      flex: 1,
      valueGetter: (params) => {
        const createdBy = params.row.createdBy;
        return createdBy.firstName + " " + createdBy.lastName;
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <>
          <EditLocationAction location={params.row} onLocationUpdate={updateRow} />
          <DeleteLocationAction location={params.row} onLocationDelete={deleteRow} />
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
      <CreateLocationAction onLocationCreate={addRow} />
    </>
  );
}
