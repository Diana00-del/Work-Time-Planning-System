import { Box, Container, Paper, Typography } from "@mui/material";
import LocationsGrid from "./LocationsGrid";

export default function Locations() {

  return (
    <Container maxWidth={false}>
      <Typography variant="h2">Locations</Typography>
      <Typography variant="body1">Here you can manage locations.</Typography>

      <Box sx={{ marginTop: 2 }} />
      <Paper elevation={3} sx={{ padding: 2 }}>
        <LocationsGrid />
      </Paper>
    </Container>
  );
}
