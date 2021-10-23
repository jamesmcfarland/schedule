import { Card, CardContent, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

const TerminologyCard = () => {
    return (  <Card sx={{ minWidth: "15vw" }}>
    <CardContent>
      <Typography gutterBottom variant="h6">
        Terminology
      </Typography>
      <Stack spacing={2}>
        <Box>
          <Typography variant="body1">Organisation</Typography>
          <Typography variant="caption" gutterBottom>
            A group of departments, it's like a big folder for your
            companys departments
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Department</Typography>
          <Typography variant="caption" gutterBottom>
            A department, in schedule, is a group of people who work
            together. Each department has its own rota.
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card> );
}
 
export default TerminologyCard;