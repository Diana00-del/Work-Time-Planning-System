import { Box, Container, Paper, Typography } from "@mui/material";
import UsersGrid from "./UsersGrid";

export default function Users() {

  return (
    <Container maxWidth={false}>
      <Typography variant="h2">Users</Typography>
      <Typography variant="body1">Here you can manage users.</Typography>

      <Box sx={{ marginTop: 2 }} />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <UsersGrid />
      </Paper>
    </Container>
  );
}
