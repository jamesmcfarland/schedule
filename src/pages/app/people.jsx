import {
  Typography,
  List,
  Paper,
  Grid,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import { getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js";
import { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import AppPage from "../../components/appPage";
import PeopleList from "../../components/PeopleList";

const People = () => {
  const [inviteUserOpen, setinviteUserOpen] = useState(false);
  
  const [error, seterror] = useState();
  const [country, setcountry] = useState("GB");

  const validate = (values) => {
    const errors = {};
    if (!values.first) {
      errors.first = "Required";
    }

    if (!values.last) {
      errors.last = "Required";
    }

    if (!values.mobile) {
      errors.mobile = "Required";
    } else if (!isValidPhoneNumber(values.mobile, country)) {
      errors.mobile = "Invalid number";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      mobile: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values);
      setinviteUserOpen(false);
      //Do the thing
    },
    validateOnChange: false,
  });
  return (
    <AppPage
      title="People"
      ChildComponent={
        <>
          <Dialog open={inviteUserOpen} >
            <DialogContent sx={{background:"#2f2f2f"}}>
              <Stack sx={{minHeight:"35vh"}}>
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
                    <Typography variant="h5">Invite to organisaton</Typography>

                    {error && <Alert severity="error">{error}</Alert>}
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
                          onBlur={formik.handleBlur}
                          error={formik.errors.first && formik.touched.first}
                          helperText={
                            formik.touched.first ? formik.errors.first : ""
                          }
                        />
                        <TextField
                          id="last"
                          name="last"
                          type="text"
                          label="last name"
                          placeholder="bloggs"
                          onChange={formik.handleChange}
                          value={formik.values.last}
                          onBlur={formik.handleBlur}
                          error={formik.errors.last && formik.touched.last}
                          helperText={
                            formik.touched.last ? formik.errors.last : ""
                          }
                        />
                      </Stack>

                      <Stack direction="row" spacing={2} alignItems="center">
                        <ReactFlagsSelect
                          fullWidth={false}
                          searchPlaceholder="start typing..."
                          selected={country}
                          showSelectedLabel={false}
                          onSelect={(code) => setcountry(code)}
                          className="fucku"
                        />
                        <TextField
                          disabled={!country}
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
                          helperText={
                            formik.touched.mobile ? formik.errors.mobile : ""
                          }
                          onBlur={formik.handleBlur}
                        />
                      </Stack>

                      <Button
                        type="submit"
                        variant="contained"
                        style={{ textTransform: "none" }}
                      >
                        Invite
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Stack>
            </DialogContent>
          </Dialog>
          <Stack>
            <Button
              sx={{ textTransform: "none" }}
              onClick={() => setinviteUserOpen(true)}
            >
              Invite to organisation
            </Button>
            <PeopleList />
          </Stack>
        </>
      }
    ></AppPage>
  );
};

export default People;
