import Calendar from "@/components/calendar/Calendar";
import { Box, Container, Paper, Typography } from "@mui/material";

export default function Dashboard(): JSX.Element {
  return (
    <Container maxWidth={false}>
      <Typography variant="h2">Calendar</Typography>
      <Typography variant="body1">Here you can manage work times.</Typography>

      <Box sx={{ marginTop: 2 }} />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Calendar />
      </Paper>
    </Container>
  );
}
