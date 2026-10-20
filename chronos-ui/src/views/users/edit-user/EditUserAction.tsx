import { Button } from "@mui/material";
import { useState } from "react";
import EditUserFormDialog from "./EditUserFormDialog";
import { Edit } from "@mui/icons-material";
import { User } from "@/services/Users";

export interface EditUserActionProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export default function EditUserAction(
  { user, onUserUpdate }: EditUserActionProps
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
      <EditUserFormDialog
        open={dialogOpen}
        onClose={closeDialog}
        user={user}
        onUserUpdate={onUserUpdate}
      />
    </>
  );
}