import { Location } from "@/services/Locations";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import EditLocationFormDialog from "./EditLocationFormDialog";

export interface EditLocationActionProps {
  location: Location;
  onLocationUpdate: (location: Location) => void;
}

export default function EditLocationAction(
  { location, onLocationUpdate }: EditLocationActionProps
) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <>
      <Button
        variant="text"
        color="primary"
        startIcon={<Edit />}
        onClick={openDialog}
      >
        Edit
      </Button>
      <EditLocationFormDialog
        open={dialogOpen}
        onClose={closeDialog}
        location={location}
        onLocationUpdate={onLocationUpdate}
      />
    </>
  );
}