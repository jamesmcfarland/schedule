import {
  Box,
  Card,
  TextField,
  Typography,
  Stack,
  Button,
  Link,
} from "@mui/material";
import { useState } from "react";
import PasswordStrengthIndicator from "../components/passwordStrength";
import VerticallyCentered from "../components/verticallyCentered";

const Register = () => {

    const [password, setpassword] = useState("");
    const [passwordStrength, setpasswordStrength] = useState(0);

  return (
    <Box className="fancy-bg">
      <VerticallyCentered>
        <Card
          style={{
            minHeight: "50vh",
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
                  Sign up
                </Typography>

                <Stack spacing={2}>
                  <Stack spacing={2} direction="row">
                    <TextField
                      type="text"
                      label="first name"
                      placeholder="joe"
                    />
                    <TextField
                      type="text"
                      label="last name"
                      placeholder="bloggs"
                    />
                  </Stack>
                  <TextField
                    type="email"
                    label="email address"
                    placeholder="joebloggs123@example.com"
                  />
                  <TextField type="password" label="password" onChange={(e)=>setpassword(e.target.value)}/>
                  <PasswordStrengthIndicator password={password} onStrengthChange={(value)=>setpasswordStrength(value)}/>
                  <TextField type="password" label="confirm password" />
                </Stack>
                <Button variant="contained" style={{ textTransform: "none" }}>
                  Sign up
                </Button>
                <Typography variant="body2">
                  got an account already?{" "}
                  <Link href="#" underline="none">
                    sign in
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

export default Register;
