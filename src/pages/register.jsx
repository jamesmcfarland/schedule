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
import { useFormik } from "formik";
import zxcvbn from "zxcvbn";

const Register = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.first) {
      errors.first = "Required";
    }

    if (!values.last) {
      errors.last = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (zxcvbn(values.password).score < 4) {
      errors.password = "Please choose a stronger password";
    }

    if (!values.verifyPassword) {
      errors.verifyPassword = "Required";
    } else if (values.verifyPassword !== values.password) {
      errors.verifyPassword = "Passwords do not match";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      first: "",
      last: "",
      password: "",
      verifyPassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box className="fancy-bg">
      <Stack padding="2rem" direction="row" justifyContent="space-between" position="absolute" width="100%">
      
          <Typography variant="h6">schedule</Typography>
   
        
          {process.env.NODE_ENV==="development" && <Typography variant="h6">developer mode</Typography>}
      
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
          <Box padding="2rem" style={{ height: "100%" }}>
            <form
              noValidate
              autoComplete="off"
              style={{ height: "100%" }}
              onSubmit={formik.handleSubmit}
            >
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
                      name="first"
                      id="first"
                      type="text"
                      label="first name"
                      placeholder="joe"
                      onChange={formik.handleChange}
                      value={formik.values.first}
                      error={formik.errors.first}
                      helperText={formik.errors.first}
                    />
                    <TextField
                      id="last"
                      name="last"
                      type="text"
                      label="last name"
                      placeholder="bloggs"
                      onChange={formik.handleChange}
                      value={formik.values.last}
                      error={formik.errors.last}
                      helperText={formik.errors.last}
                    />
                  </Stack>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="email address"
                    placeholder="joebloggs123@example.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                    helperText={formik.errors.email}
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="password"
                    // onChange={(e) => {setpassword(e.target.value); formik.handleChange(e);}}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    error={formik.errors.password}
                    helperText={formik.errors.password}
                  />
                  {/* <PasswordStrengthIndicator
                    password={password}
                    onStrengthChange={(value) => setpasswordStrength(value)}
                  /> */}
                  <TextField
                    id="verifyPassword"
                    name="verifyPassword"
                    type="password"
                    label="confirm password"
                    onChange={formik.handleChange}
                    value={formik.values.verifyPassword}
                    error={formik.errors.verifyPassword}
                    helperText={formik.errors.verifyPassword}
                  />
                </Stack>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ textTransform: "none" }}
                >
                  Sign up
                </Button>
                <Typography variant="body2">
                  got an account already?{" "}
                  <Link href="/login" underline="none">
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
