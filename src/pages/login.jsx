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
import AuthPage from "../components/authPage";

const Login = () => {
  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <AuthPage>
      <form
        noValidate
        autoComplete="off"
        style={{ height: "50vh" }} //FIXME this is hacky - should be 100%
        onSubmit={formik.handleSubmit}
      >
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
              id="email"
              name="email"
              type="email"
              label="email address"
              placeholder="joebloggs123@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
         
              error={formik.errors.email && formik.touched.email}
              helperText={formik.touched.email ?formik.errors.email:""}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              // onChange={(e) => {setpassword(e.target.value); formik.handleChange(e);}}
              onChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password && formik.touched.password}
              helperText={formik.touched.password ?formik.errors.password:""}
              onBlur={formik.handleBlur}
            />{" "}
          </Stack>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            type="submit"
          >
            Sign in
          </Button>
          <Typography variant="body2">
            haven't got an account yet?{" "}
            <Link href="/register" underline="none">
              sign up
            </Link>
          </Typography>
        </Stack>

        {/* TODO: Add in submit button, work on MUIv5 compat styling.  */}
      </form>
    </AuthPage>
  );
};

export default Login;
