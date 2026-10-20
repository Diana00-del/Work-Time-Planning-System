import { Button } from "@mui/material";
import { useState } from "react";
import DeleteUserConfirmationDialog from "./DeleteUserConfirmationDialog";
import { DeleteForever } from "@mui/icons-material";
import { User } from "@/services/Users";

export interface DeleteUserActionProps {
  user: User;
  onUserDelete: (userId: number) => void;
}

export default function DeleteUserAction(
  { user, onUserDelete }: DeleteUserActionProps
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
      <DeleteUserConfirmationDialog
        open={dialogOpen}
        onClose={closeDialog}
        user={user}
        onUserDelete={onUserDelete}
      />
    </>
  );
}