import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { getCountryCallingCode, isValidPhoneNumber } from "libphonenumber-js";
import { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import { useRecoilValue } from "recoil";
import { departmentAtom, organisationDepartmentsAtom } from "../atoms";
import { useOrg } from "../contexts/OrgContext";

const InviteDialog = ({ isOpen, onClose }) => {
  const [error, seterror] = useState();
  const [country, setcountry] = useState("GB");

  const organisationDepartments = useRecoilValue(organisationDepartmentsAtom);
  const department = useRecoilValue(departmentAtom);
  const [inviteDepartment, setinviteDepartment] = useState("");

  const { inviteUserToOrg } = useOrg();

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

    console.log("validing");

    return errors;
  };

  useEffect(() => {
    if (organisationDepartments.length && !inviteDepartment) {
      setinviteDepartment(department);
    }
  });

  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      email: "",
      mobile: "",
    },
    validateOnChange: false,
    validate,
    onSubmit: (values) => {
      inviteUserToOrg(
        values.first,
        values.last,
        values.mobile,
        values.email,
        country,
        organisationDepartments[inviteDepartment].id,
        localStorage.getItem("id")
      )
        .then(() => {
          onClose();
        })
        .catch((err) => {
          console.log(err);
          seterror(values.first + " has already been invited!");
        });
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent sx={{ background: "#2f2f2f" }}>
        <Stack sx={{ minHeight: "35vh" }}>
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
                    helperText={formik.touched.first ? formik.errors.first : ""}
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
                    helperText={formik.touched.last ? formik.errors.last : ""}
                  />
                </Stack>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="email address"
                  placeholder="user@schedule.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  error={formik.errors.email && formik.touched.email}
                  helperText={formik.touched.email ? formik.errors.email : ""}
                />

                <Stack direction="row" spacing={2} alignItems="center">
                  <ReactFlagsSelect
                    fullWidth={false}
                    searchPlaceholder="start typing..."
                    selected={country}
                    showSelectedLabel={false}
                    onSelect={(code) => setcountry(code)}
                    className="react-flags-selector"
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
                <FormControl>
                  <InputLabel id="dept-select">Department</InputLabel>
                  <Select
                    id="dept-select"
                    label="Department"
                    value={inviteDepartment}
                    onChange={(e) => {
                      console.log("ch", e.target.value);
                      setinviteDepartment(e.target.value);
                    }}
                  >
                    {organisationDepartments.map((e, i) => {
                      return (
                        <MenuItem key={i} value={i}>
                          {e.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
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
  );
};

export default InviteDialog;
