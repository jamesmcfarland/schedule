import {
  Box,
  Card, Stack, Typography
} from "@mui/material";
import VerticallyCentered from "../verticallyCentered";

const AuthPage = ({children}) => {
  return (
    <Box className="fancy-bg">
      <Stack
        padding="2rem"
        direction="row"
        justifyContent="space-between"
        position="absolute"
        width="100%"
      >
        <Typography variant="h6">schedule</Typography>

        {process.env.NODE_ENV === "development" && (
         <Stack spacing={0}>
              <Typography variant="h6">developer build</Typography>
              <Typography variant="body1">do not distribute</Typography>

         </Stack>
        )}
      </Stack>
      <VerticallyCentered>
        <Card
          style={{
            minHeight: "50vh",
            width: "40vw",
            borderRadius: "1rem",
            // backgroundColor: "#3a3a3a",
          }}
        >
          <Box padding="2rem" style={{ height: "100%" }} >{children}</Box>
        </Card>
      </VerticallyCentered>
    </Box>
  );
};

export default AuthPage;
