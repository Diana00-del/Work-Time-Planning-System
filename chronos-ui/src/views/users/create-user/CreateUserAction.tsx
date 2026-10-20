import { Button } from "@mui/material";
import { useState } from "react";
import CreateUserFormDialog from "./CreateUserFormDialog";
import { User } from "@/services/Users";

export interface CreateUserActionProps {
  onUserCreate: (user: User) => void;
}

export default function CreateUserAction({ onUserCreate }: CreateUserActionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  
  return (
    <>
      <Button variant="contained" color="primary" onClick={openDialog}>Add User</Button>
      <CreateUserFormDialog open={dialogOpen} onClose={closeDialog} onUserCreate={onUserCreate} />
    </>
  );
}

