import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PersonAdd, PersonRemove } from "@mui/icons-material";
import { Role } from "@/contexts/Auth";
import useUsers, { User } from "@/services/Users";
import { useSnackbarContext } from "@/contexts/Snacks";

export interface UserRolesCellRendererProps {
  user: User;
  onUserUpdate: (user: User) => void;
}

export default function UserRolesCellRenderer({ user, onUserUpdate }: UserRolesCellRendererProps) {
  const { assignRole, removeRole } = useUsers();
  const { showSuccess, showError } = useSnackbarContext();

  const isAdmin = user.roles.includes("ADMIN");
  const isManager = user.roles.includes("MANAGER");
  const isEmployee = user.roles.includes("EMPLOYEE");

  const handleRoleUpdate = (role: Role) => {
    if (user.roles.includes(role)) {
      removeRole(user.id, role)
        .then(() => {
          onUserUpdate({ ...user, roles: user.roles.filter((r) => r !== role) });
          showSuccess("Role removed successfully", "Role Removed");
        })
        .catch((error) => showError(error.message, "Failed to remove role"));
    } else {
      assignRole(user.id, role)
        .then(() => {
          onUserUpdate({ ...user, roles: [...user.roles, role] })
          showSuccess("Role assigned successfully", "Role Assigned");
        })
        .catch((error) => showError(error.message, "Failed to assign role"));
    }
  };

  return (
    <>
      <List>
        <ListItem>
          <ListItemButton onClick={() => handleRoleUpdate("ADMIN")}>
            <ListItemIcon color={isAdmin ? "secondary" : "primary"}>
              {isAdmin ? <PersonRemove /> : <PersonAdd />}
            </ListItemIcon>
            <ListItemText primary="Admin" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoleUpdate("MANAGER")}>
            <ListItemIcon color={isManager ? "secondary" : "primary"}>
              {isManager ? <PersonRemove /> : <PersonAdd />}
            </ListItemIcon>
            <ListItemText primary="Manager" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => handleRoleUpdate("EMPLOYEE")}>
            <ListItemIcon color={isEmployee ? "secondary" : "primary"}>
              {isEmployee ? <PersonRemove /> : <PersonAdd />}
            </ListItemIcon>
            <ListItemText primary="Employee" />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}