import {
  Alert,
  Autocomplete,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { countries, getPhoneCodeByLabel } from "../../../utils/countries";

const OrganisationDetails = () => {
  const [error, seterror] = useState();
  const [orgCountry, setorgCountry] = useState(countries.filter(country=>country.label==="United Kingdom")[0]);

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
      orgName: "",
      orgAddrLine1: "",
      orgAddrLine2: "",
      orgCity: "",
      orgPostCode: "",
      orgPhoneContact: "",
    },
    validate,
    onSubmit: (values) => {
      // signUpWithEmail(values)
      //   .then(() => {
      //     history.push("/app");
      //   })
      //   .catch((err) => {
      //     console.log(err.code);
      //     switch (err.code) {
      //       case "auth/email-already-in-use":
      //         seterror("That email is already in use, please login instead");
      //         break;
      //       default:
      //         seterror(
      //           "We couldn't register your account, please contact support"
      //         );
      //         break;
      //     }
      //   });
      console.log(values);
    },
  });

  return (
    <form
      noValidate
      autoComplete="off"
      // style={{ height: "100%" }}
      onSubmit={formik.handleSubmit}
    >
      <Stack
        spacing={3}
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Stack spacing={2}>
          <Typography variant="h6">Organisation info</Typography>
          <Autocomplete
            disablePortal
            isOptionEqualToValue={(option, value) => {
              return option.label === value;
            }}
            id="orgCountry"
            name="orgCountry"
            onChange={(e, val) => {
              setorgCountry(val);
            }}
            onBlur={formik.handleBlur}
            value={orgCountry}
            error={formik.errors.orgCountry && formik.touched.orgCountry}
            helperText={
              formik.touched.orgCountry ? formik.errors.orgCountry : ""
            }
            options={countries}
            autoHighlight
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
          <TextField
            id="orgName"
            name="orgName"
            type="text"
            label="Organisation name"
            placeholder="Jimmy's Bakery Plc."
            onChange={formik.handleChange}
            value={formik.values.orgName}
            onBlur={formik.handleBlur}
            error={formik.errors.orgName && formik.touched.orgName}
            helperText={formik.touched.orgName ? formik.errors.orgName : ""}
          />
          <TextField
            id="orgPhoneContact"
            name="orgPhoneContact"
            type="tel"
            label="Organisation phone"
            placeholder="20 123 45678"
            onChange={formik.handleChange}
            value={formik.values.orgPhoneContact}
            onBlur={formik.handleBlur}
            error={
              formik.errors.orgPhoneContact && formik.touched.orgPhoneContact
            }
            helperText={
              formik.touched.orgPhoneContact
                ? formik.errors.orgPhoneContact
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  +{orgCountry.phone}
                </InputAdornment>
              ),
            }}
          />

          <TextField
            id="orgAddrLine1"
            name="orgAddrLine1"
            type=""
            label="Address line 1"
            placeholder="279 Scone Road"
            onChange={formik.handleChange}
            value={formik.values.orgAddrLine1}
            error={formik.errors.orgAddrLine1 && formik.touched.orgAddrLine1}
            helperText={
              formik.touched.orgAddrLine1 ? formik.errors.orgAddrLine1 : ""
            }
            onBlur={formik.handleBlur}
          />
          <TextField
            id="orgAddrLine2"
            name="orgAddrLine2"
            type="text"
            label="Address line 2"
            placeholder="279 Scone Road"
            onChange={formik.handleChange}
            value={formik.values.orgAddrLine2}
            error={formik.errors.orgAddrLine2 && formik.touched.orgAddrLine2}
            helperText={
              formik.touched.orgAddrLine2 ? formik.errors.orgAddrLine2 : ""
            }
            onBlur={formik.handleBlur}
          />

          <TextField
            id="orgCity"
            name="orgCity"
            type="text"
            label="Town/City"
            placeholder="London"
            onChange={formik.handleChange}
            value={formik.values.orgCity}
            error={formik.errors.orgCity && formik.touched.orgCity}
            helperText={formik.touched.orgCity ? formik.errors.orgCity : ""}
            onBlur={formik.handleBlur}
          />

          <TextField
            id="orgPostCode"
            name="orgPostCode"
            type="text"
            label="Postcode (Zip code)"
            placeholder="AB12 3CD"
            onChange={formik.handleChange}
            value={formik.values.orgPostCode}
            error={formik.errors.orgPostCode && formik.touched.orgPostCode}
            helperText={
              formik.touched.orgPostCode ? formik.errors.orgPostCode : ""
            }
            onBlur={formik.handleBlur}
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default OrganisationDetails;
