import {
  Box,
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  Grid,
  Link,
} from "@mui/material";
import VerticallyCentered from "../components/verticallyCentered";

const Login = () => {
  const errorText = "";
  return (
    <Box className="fancy-bg">
      <VerticallyCentered>
        <Card
          style={{
            height: "50vh",
            width: "40vw",
            borderRadius: "1rem",
            // backgroundColor: "#3a3a3a",
          }}
        >
          <Box padding="2rem" style={{ height: "100%" }}>
            <form noValidate autoComplete="off" style={{ height: "100%" }}>
              <Stack
                spacing={2}
                justifyContent="space-between"
                style={{ height: "100%" }}
              >
                <Typography variant="h4" gutterBottom>
                  Sign in
                </Typography>

                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    type="email"
                    error={errorText}
                    helperText={errorText}
                    label="email address"
                  />
                  <TextField
                    type="password"
                    error={errorText}
                    helperText={errorText}
                    label="password"
                  />{" "}
                </Stack>
                <Button variant="contained" style={{ textTransform: "none" }}>
                  Sign in
                </Button>
                <Typography variant="body2">
                  haven't got an account yet?{" "}
                  <Link href="#" underline="none">
                    sign up
                  </Link>
                </Typography>
              </Stack>

              {/* TODO: Add in submit button, work on MUIv5 compat styling.  */}
            </form>
          </Box>
        </Card>
      </VerticallyCentered>
    </Box>
  );
};

export default Login;
