import { Container, CssBaseline } from "@mui/material";
import NavigationDrawer from "../navigation-drawer/NavigationDrawer";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@contexts/Auth";

export default function Root() {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "flex-start",
        height: "100vh",
        padding: 0,
      }}
    >
      <CssBaseline />
      <NavigationDrawer />
      <Outlet />
    </Container>
  );
}