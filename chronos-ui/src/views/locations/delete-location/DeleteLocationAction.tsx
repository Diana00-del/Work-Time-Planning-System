import { Location } from "@/services/Locations";
import { DeleteForever } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import DeleteLocationConfirmationDialog from "./DeleteLocationConfirmationDialog";

export interface DeleteLocationActionProps {
  location: Location;
  onLocationDelete: (locationId: number) => void;
}

export default function DeleteLocationAction(
  { location, onLocationDelete }: DeleteLocationActionProps
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <Button
        variant="text"
        color="primary"
        startIcon={<DeleteForever />}
        onClick={openDialog}
      >
        Delete
      </Button>
      <DeleteLocationConfirmationDialog
        open={dialogOpen}
        onClose={closeDialog}
        location={location}
        onLocationDelete={onLocationDelete}
      />
    </>
  );
}