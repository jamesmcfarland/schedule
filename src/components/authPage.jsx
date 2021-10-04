import {
  Box,
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import VerticallyCentered from "../components/verticallyCentered";

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
          <Typography variant="h6">developer mode</Typography>
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
