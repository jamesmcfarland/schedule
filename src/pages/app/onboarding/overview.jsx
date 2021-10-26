import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";

const Overview = ({
  organisationDetailsState,
  departments,
  setCanContinue,
}) => {
  const [departmentsPretty, setdepartmentsPretty] = useState("");
  const [infoCorrect, setinfoCorrect] = useState(false);
  const [permission, setPermission] = useState(false);
  useEffect(() => {
    let pretty = "";
    for (let dept in departments) {
      switch (dept) {
        case "0":
          pretty = departments[dept].name;
          break;
        case String(departments.length - 1):
          pretty += ", " + departments[dept].name;
          break;
        case "1":
          pretty += ", " + departments[dept].name + ", ";
          break;
        default:
          pretty += departments[dept].name + ", ";
          break;
      }
    }
    setdepartmentsPretty(pretty);

    console.log(infoCorrect, permission, infoCorrect && permission);
    setCanContinue(infoCorrect && permission);
  }, [infoCorrect, permission]);

  return (
    <Stack>
      <Typography variant="h6">Overview</Typography>
      <Typography>
        Organisation Name: {organisationDetailsState.orgName}{" "}
      </Typography>
      <Typography>
        Address line 1: {organisationDetailsState.orgAddrLine1}{" "}
      </Typography>
      <Typography>
        Address line 2: {organisationDetailsState.orgAddrLine2}{" "}
      </Typography>
      <Typography>City: {organisationDetailsState.orgCity} </Typography>
      <Typography>Postcode: {organisationDetailsState.orgPostCode} </Typography>
      <Typography>Country: {organisationDetailsState.orgName} </Typography>
      <Typography>
        Contact: {organisationDetailsState.orgPhoneContact}{" "}
      </Typography>
      <Typography>Departments: {departmentsPretty}</Typography>

      <Box marginTop="2rem">
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Checkbox
              size="small"
              checked={infoCorrect}
              onChange={(e) => setinfoCorrect(e.target.checked)}
            //   inputProps={{ "aria-label": "controlled" }}
            />
            <Typography variant="body2">
              by checking this box you agree that the information given above is
              correct and accurate to the best of your knowledge
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Checkbox
              size="small"
              checked={permission}
              onChange={(e) => setPermission(e.target.checked)}
            //   inputProps={{ "aria-label": "controlled" }}
            />
            <Typography component="div" variant="body2">
              by checking this box you agree that{" "}
              <Box fontWeight="600" display="inline">
                you have permission
              </Box>{" "}
              to create this account on behalf of the organisation registered
              and/or operating from the address given above. Futher, you
              understand that unauthorised accounts will be terminated and{" "}
              <Box fontWeight="600" display="inline">
                permenantly banned
              </Box>{" "}
              from the platform.
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Overview;
