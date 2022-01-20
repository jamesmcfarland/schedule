import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  departmentAtom,
  organisationDepartmentsAtom,
  organisationIdAtom,
} from "../atoms";
import { useOrg } from "../contexts/OrgContext";

const AppPage = ({ title, children }) => {
  const [dept, setdept] = useState("");

  const [organisationDepartments, setOrganisationDepartments] = useRecoilState(
    organisationDepartmentsAtom
  );
  const setDepartment = useSetRecoilState(departmentAtom);

  const [date, setdate] = useState(format(new Date(), "EEEE, do LLLL yyyy"));
  const [time, settime] = useState(format(new Date(), "HH:mm (OOOO)"));

  const [departmentDialogOpen, setdepartmentDialogOpen] = useState(false);
  const [newDepartmentName, setnewDepartmentName] = useState("");
  const [newDepartmentError, setnewDepartmentError] = useState("");

  const currentOrgId = useRecoilValue(organisationIdAtom);

  const { addNewDept, getOrgDepartments } = useOrg();

  const handleDeptChange = (e) => {



    if (organisationDepartments.length) {
      setdept(e.target.value);
      setDepartment(organisationDepartments[e.target.value].id);
    } else {
      setdept("");
    }
  };

  const handleNewDept = () => {
    try {
      addNewDept(newDepartmentName, currentOrgId)
        .then(() => {
          getOrgDepartments(currentOrgId).then((departments) => {
            setOrganisationDepartments(departments);
            setdepartmentDialogOpen(false);
          });
        })
        .catch((err) => setnewDepartmentError(err.message));
    } catch (e) {
      console.log(currentOrgId);
      console.log(e);
      setnewDepartmentError("Unable to add department");
    }
  };

  useEffect(() => {

    if (organisationDepartments.length && !dept) {
      setdept(0);
      setDepartment(0);
    }
    

    const interval = setInterval(() => {
      setdate(format(new Date(), "EEEE, do LLLL yyyy"));
      settime(format(new Date(), "HH:mm (OOOO)"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1em 0",
      }}
    >
      <Dialog open={departmentDialogOpen}>
        <DialogContent>
          <DialogTitle>Add department</DialogTitle>
          <Stack spacing={2}>
            {newDepartmentError && (
              <Alert severity="error">{newDepartmentError}</Alert>
            )}
            <TextField
              label="department name"
              value={newDepartmentName}
              onChange={(e) => setnewDepartmentName(e.target.value)}
            />

            <Button
              style={{ textTransform: "none" }}
              type="text"
              onClick={handleNewDept}
            >
              Add department
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ paddingBottom: "1em" }}
      >
        <Stack direction="row" spacing={5} alignItems="center">
          <Typography variant="h5" sx={{ padding: "0 1rem" }}>
            {title}
          </Typography>
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 140, width: "15vw" }}
          >
            <InputLabel id="dept-select">Department</InputLabel>
            <Select
              id="dept-select"
              label="Department"
              value={dept}
              sx={{ textAlign: "left" }}
              onChange={handleDeptChange}
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
            style={{ textTransform: "none" }}
            type="text"
            onClick={() => {
              setdepartmentDialogOpen(true);
            }}
          >
            Add department
          </Button>
        </Stack>

        <div style={{ display: "inline" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography>{date}</Typography>
            <Typography>{time}</Typography>
          </Stack>
        </div>
      </Stack>

      {children}
    </div>
  );
};

export default AppPage;
