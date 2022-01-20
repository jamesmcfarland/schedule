import {
  Alert,
  Button,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useHistory } from "react-router";
import zxcvbn from "zxcvbn";
import AuthPage from "../components/authPage";
import { useOrg } from "../contexts/OrgContext";
import { useUser } from "../contexts/UserContext";

const Register = () => {
  const [invID, setinvID] = useState("");
  const [inviteData, setinviteData] = useState();

  const { getInviteInfo, acceptInvite } = useOrg();

  const { signUpWithEmailAndAddToOrg, signUpWithEmail } = useUser();
  const history = useHistory();
  const [error, seterror] = useState();
  const [country, setcountry] = useState("GB");

  useEffect(() => {
    setinvID(localStorage.getItem("INV"));

    const id = localStorage.getItem("INV");

    if (id) {
      getInviteInfo(id).then((data) => {
        setinviteData(data);
      });
    }
  }, []);

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

    if (!values.mobile) {
      errors.mobile = "Required";
    } else if (!isValidPhoneNumber(values.mobile, country)) {
      errors.mobile = "Invalid number";
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

  const formikOnSubmit = (values) => {
    if (!inviteData) {
      signUpWithEmail(values)
        .then(() => history.push("/app"))
        .catch((err) => {
          console.log(err.code);
          switch (err.code) {
            case "auth/email-already-in-use":
              seterror("That email is already in use, please login instead");
              break;
            default:
              seterror(
                "We couldn't register your account, please contact support"
              );
              break;
          }
        });
    } else {
      signUpWithEmailAndAddToOrg(values, inviteData.org, "Member").then(() => {
        acceptInvite(localStorage.getItem("INV"));

        history.push("/app");
      });
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: !!inviteData ? inviteData.email : "",
      mobile: !!inviteData ? inviteData.mobile : "",
      first: !!inviteData ? inviteData.first : "",
      last: !!inviteData ? inviteData.last : "",
      password: "",
      verifyPassword: "",
    },
    validate,
    onSubmit: formikOnSubmit,
    validateOnChange: false,
  });

  return (
    <AuthPage>
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
            Sign up{!!inviteData ? ` to join ${inviteData.orgName}` : ""}
          </Typography>{" "}
          {error && <Alert severity="error">{error}</Alert>}
          <Stack spacing={2}>
            <Stack spacing={2} direction="row">
              <TextField
                disabled={!!inviteData}
                name="first"
                id="first"
                type="text"
                label="first name"
                placeholder="joe"
                onChange={formik.handleChange}
                value={formik.values.first}
                onBlur={formik.handleBlur}
                error={formik.errors.first && formik.touched.first}
                helperText={formik.touched.first ? formik.errors.first : ""}
              />
              <TextField
                disabled={!!inviteData}
                id="last"
                name="last"
                type="text"
                label="last name"
                placeholder="bloggs"
                onChange={formik.handleChange}
                value={formik.values.last}
                onBlur={formik.handleBlur}
                error={formik.errors.last && formik.touched.last}
                helperText={formik.touched.last ? formik.errors.last : ""}
              />
            </Stack>
            <TextField
                      disabled={!!inviteData}
              id="email"
              name="email"
              type="email"
              label="email address"
              placeholder="joebloggs123@example.com"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.errors.email && formik.touched.email}
              helperText={formik.touched.email ? formik.errors.email : ""}
              onBlur={formik.handleBlur}
            />

            <Stack direction="row" spacing={2} alignItems="center">
              <ReactFlagsSelect
                disabled={!!inviteData}
                fullWidth={false}
                searchPlaceholder="start typing..."
                selected={country}
                showSelectedLabel={false}
                onSelect={(code) => setcountry(code)}
                className="react-flags-selector"
              />
              <TextField
                disabled={!country || !!inviteData}
                id="mobile"
                name="mobile"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      +{getCountryCallingCode(country)}
                    </InputAdornment>
                  ),
                }}
                type="tel"
                fullWidth
                label="mobile phone"
                placeholder="123 456789"
                onChange={formik.handleChange}
                value={formik.values.mobile}
                error={formik.errors.mobile && formik.touched.mobile}
                helperText={formik.touched.mobile ? formik.errors.mobile : ""}
                onBlur={formik.handleBlur}
              />
            </Stack>

            <TextField
              id="password"
              name="password"
              type="password"
              label="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={formik.errors.password && formik.touched.password}
              helperText={formik.touched.password ? formik.errors.password : ""}
            />

            <TextField
              id="verifyPassword"
              name="verifyPassword"
              type="password"
              label="confirm password"
              onChange={formik.handleChange}
              value={formik.values.verifyPassword}
              onBlur={formik.handleBlur}
              error={
                formik.errors.verifyPassword && formik.touched.verifyPassword
              }
              helperText={
                formik.touched.verifyPassword
                  ? formik.errors.verifyPassword
                  : ""
              }
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
      </form>
    </AuthPage>
  );
};

export default Register;
