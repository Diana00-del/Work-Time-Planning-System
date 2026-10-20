import { Location } from "@/services/Locations";
import { Button } from "@mui/material";
import { useState } from "react";
import CreateLocationFormDialog from "./CreateLocationFormDialog";

export interface CreateLocationActionProps {
  onLocationCreate: (location: Location) => void;
}

export default function CreateLocationAction({ onLocationCreate }: CreateLocationActionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDialog}>Add Location</Button>
      <CreateLocationFormDialog open={dialogOpen} onClose={closeDialog} onLocationCreate={onLocationCreate} />
    </>
  );
}