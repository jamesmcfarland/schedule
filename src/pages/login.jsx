import { Box, Card, TextField, Typography, Stack } from "@mui/material";
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
          <Box padding="2rem">
            <Typography variant="h4" gutterBottom>Sign in</Typography>
            <form noValidate autoComplete="off">
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
                />
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
