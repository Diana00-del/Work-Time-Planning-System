import { AccountCircle, CalendarMonth, Group, LocationOn, Logout, Menu } from "@mui/icons-material";
import { Box, Divider, Drawer, Link, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/contexts/Auth";

export default function NavigationDrawer() {
  const [open, setOpen] = useState(false);
  const drawerWidth = 280;
  const theme = useTheme();
  const auth = useAuth();

  const toggleDrawer = () => setOpen(!open);

  const logout = () => {
    auth.logout().then(() => {
      setOpen(false);
    });
  };

  const drawerOpenAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  });
  const drawerCloseAnimation = theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  });

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        position: "relative",
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: open ? drawerOpenAnimation : drawerCloseAnimation,
        width: open ? drawerWidth : theme.spacing(8),
        "& .MuiDrawer-paper": {
          transition: open ? drawerOpenAnimation : drawerCloseAnimation,
          width: open ? drawerWidth : theme.spacing(9),
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          overflow: "hidden",
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        justifyContent="flex-end"
        height="100%"
        width={open ? drawerWidth : theme.spacing(9)}
        padding={1}
      >
        <List>
          <Link component={RouterLink} to="/" underline="none" color="inherit">
            <ListItemButton>
              <ListItemIcon>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </Link>
          <Link component={RouterLink} to="/locations" underline="none" color="inherit">
            <ListItemButton>
              <ListItemIcon>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary="Locations" />
            </ListItemButton>
          </Link>
          <Link component={RouterLink} to="/users" underline="none" color="inherit">
            <ListItemButton>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Users" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
        <Box flexGrow={1} />
        <Divider />
        <List>
          <Link component={RouterLink} to="/account" underline="none" color="inherit">
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </Link>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          <ListItemButton onClick={toggleDrawer}>
            <ListItemIcon>
              <Menu />
            </ListItemIcon>
            <ListItemText primary="Close" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}