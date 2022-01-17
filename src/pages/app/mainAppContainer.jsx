import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  Switch as RouterSwitch,
  useHistory,
} from "react-router";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/menu";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import Noticeboard from "./noticeboard";
import OnboardingFlow from "./onboarding/onboarding";
import People from "./people";
import Rota from "./rota";
import SettingsPage from "./settings";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { v4 as uuidv4 } from "uuid";

const emps = [
  {
    name: "James McFarland",
    employeeId: uuidv4(),
    shifts: [
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 17, 17),
        shiftEnd: new Date(2022, 0, 18, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 18, 10),
        shiftEnd: new Date(2022, 0, 18, 20),
        isClose: false,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 20, 15),
        shiftEnd: new Date(2022, 0, 21, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 21, 15),
        shiftEnd: new Date(2022, 0, 22, 3),
        isClose: true,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 23, 15),
        shiftEnd: new Date(2022, 0, 24, 3),
        isClose: true,
        shiftNotes: "bar",
      },
    ],
  },
  {
    name: "Jude O'Kane",
    employeeId: uuidv4(),
    shifts: [
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 17, 15),
        shiftEnd: new Date(2022, 0, 18, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 18, 15),
        shiftEnd: new Date(2022, 0, 19, 20),
        isClose: true,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 21, 12),
        shiftEnd: new Date(2022, 0, 21, 20),
        isClose: false,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 22, 15),
        shiftEnd: new Date(2022, 0, 23, 3),
        isClose: true,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: new Date(2022, 0, 23, 15),
        shiftEnd: new Date(2022, 0, 24, 3),
        isClose: true,
        shiftNotes: "bar",
      },
    ],
  },
];

const MainAppContainer = () => {
  const { getUserInfo } = useUser();
  const { getOrgInfo } = useOrg();
  const [needsOnboarding, setneedsOnboarding] = useState(false);
  const [udata, setudata] = useState({ data: "waiting" });
  const [orgData, setorgData] = useState({ data: "waiting" });
  const [userOrgs, setuserOrgs] = useState([]);
  const [currentUserRole, setcurrentUserRole] = useState("awaiting data");

  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [addNewOrgNeeded, setaddNewOrgNeeded] = useState(false);

  const [newShiftDate, setnewShiftDate] = useState(new Date());
  const [newShiftEndDate, setnewShiftEndDate] = useState(new Date());
  const [isCloseShift, setisCloseShift] = useState(false);
  const [newShiftEmployeeId, setnewShiftEmployeeId] = useState();
  const [newShiftEmployeeName, setnewShiftEmployeeName] = useState();
  const [newShiftNotes, setnewShiftNotes] = useState();
  const [employees, setemployees] = useState(emps);

  const getOrgData = async (orgs) => {
    let processed = [];
    for (const org of orgs) {
      const data = await getOrgInfo(org.id);
      processed.push({ ...data, id: org.id });
    }
    setuserOrgs(processed);
  };

  const changeOrganisation = () => {
    localStorage.removeItem("id");
    getOrgData(udata.organisations);
    setisDialogOpen(true);
  };

  const addNewShift = () => {
    let newEmployees = employees;
    newEmployees
      .find((employee) => employee.employeeId === newShiftEmployeeId)
      .shifts.push({
        isShift: true,
        shiftid: uuidv4(),
        shiftStart: newShiftDate,
        shiftEnd: newShiftEndDate,
        shiftNotes: newShiftNotes,
        isClose: isCloseShift,
      });

    setemployees(newEmployees);
    setnewShiftEmployeeId(undefined);
    setnewShiftDate(undefined);
    setnewShiftEndDate(undefined);
    setnewShiftEmployeeName(undefined);
    setnewShiftNotes(undefined);
  };

  const openNewShiftDialog = (employeeId, date) => {
    setnewShiftEmployeeId(employeeId);
    setnewShiftDate(date);
    setnewShiftEndDate(date);
    setnewShiftEmployeeName(
      employees.find((employee) => employee.employeeId === employeeId).name
    );
  };

  useEffect(() => {
    // setcurrentOrgID(localStorage.getItem("id"))
    if (addNewOrgNeeded) {
      setneedsOnboarding(true);
      return;
    }
    let currentOrgID = localStorage.getItem("id");

    getUserInfo().then((userdata) => {
      setudata(userdata);
      setneedsOnboarding(!userdata.organisations.length);

      if (userdata.organisations.length === 1) {
        currentOrgID = userdata.organisations[0].id;
      }
      setisDialogOpen(!currentOrgID);

      if (!currentOrgID) {
        getOrgData(userdata.organisations);
      } else {
        getOrgInfo(currentOrgID).then((org) => setorgData(org));
        setcurrentUserRole(
          userdata.organisations.find((el) => el.id === currentOrgID).role
        );
      }
    });
    console.log("r");
  }, [currentUserRole, addNewOrgNeeded, employees]);

  return (
    <div>
      <Dialog open={isDialogOpen} handleClose={() => setisDialogOpen(false)}>
        <DialogTitle>Select organisation</DialogTitle>
        <List>
          {userOrgs.map((org) => {
            return (
              <ListItem
                button
                onClick={() => {
                  setcurrentUserRole(org.id);
                  localStorage.setItem("id", org.id);
                }}
                key={org.id}
              >
                <ListItemAvatar>
                  <Avatar>{org.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={org.name} />
              </ListItem>
            );
          })}
          <ListItem
            button
            onClick={() => {
              setaddNewOrgNeeded(true);
            }}
            key="NEW"
          >
            <ListItemAvatar>
              <Avatar>+</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add new" />
          </ListItem>
        </List>
      </Dialog>

      <Dialog open={!!newShiftEmployeeId}>
        <DialogContent>
          <DialogTitle>Add shift for {newShiftEmployeeName}</DialogTitle>
          <Stack spacing={2}>
            <DateTimePicker
              label="start"
              value={newShiftDate}
              onChange={(newValue) => setnewShiftDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={isCloseShift}
                  onChange={(e) => setisCloseShift(e.target.checked)}
                />
              }
              label="Close shift"
            />

            <DateTimePicker
              disabled={isCloseShift}
              label="end"
              value={newShiftEndDate}
              onChange={(newValue) => setnewShiftEndDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />

            <TextField
              multiline
              maxRows={4}
              label="notes"
              value={newShiftNotes}
              onChange={(e) => setnewShiftNotes(e.target.value)}
            />

            <Button
              variant="contained"
              size="small"
              style={{ textTransform: "none" }}
              onClick={() => addNewShift()}
            >
              Add shift
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

      <div style={{ width: "100vw", display: "flex", flexDirection: "row" }}>
        <Menu
          isVisible={!needsOnboarding}
          organisationData={orgData}
          userData={udata}
          changeOrganisation={changeOrganisation}
          currentUserRole={currentUserRole}
        ></Menu>
        {needsOnboarding && <Redirect to="/onboarding" />}

        <Box
          padding="0 1em"
          style={{
            width: "100%",
          }}
        >
          <RouterSwitch>
            <Route exact path="/app">
              <Rota
                openNewShiftDialog={openNewShiftDialog}
                employees={employees}
              />
            </Route>
            <Route path="/app/people" component={People} />
            <Route path="/app/noticeboard" component={Noticeboard} />
            <Route path="/app/settings" component={SettingsPage} />
          </RouterSwitch>
        </Box>
      </div>
    </div>
  );
};

export default MainAppContainer;
