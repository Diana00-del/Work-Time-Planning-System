import { Box, Container, Paper, Typography } from "@mui/material";
import UpdateAccountInformationForm from "./UpdateAccountInformationForm";
import ChangePasswordForm from "./ChangePasswordForm";

function Account() {
  return (
    <Container maxWidth={false}>
      <Typography variant="h2">Account</Typography>
      <Typography variant="body1">This is the account page.</Typography>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h3">Account Information</Typography>
        <Typography variant="body1">This is where you can view and edit your account information.</Typography>

        <Box sx={{ marginTop: 2 }} />
        <UpdateAccountInformationForm />
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <Typography variant="h3">Password</Typography>
        <Typography variant="body1">This is where you can change your password.</Typography>

        <Box sx={{ marginTop: 2 }} />
        <ChangePasswordForm />
      </Paper>
    </Container>
  );
}

export default Account;
