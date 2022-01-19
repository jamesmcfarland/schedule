import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
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
import { Redirect, Route, Switch as RouterSwitch } from "react-router";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import Noticeboard from "./noticeboard";
import People from "./people";
import Rota from "./rota";
import SettingsPage from "./settings";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useResetRecoilState } from "recoil";
import _ from "lodash";
import { employeesAtom } from "../../atoms/Employees";
import { shiftAtom } from "../../atoms/Shift";
import Menu from "../../components/menu/menu";
import ShiftDialog from "../../components/shifts/ShiftDialog";
import MainApp from "../../components/MainApp";

const AppContainer = () => {
  const { getUserInfo } = useUser();
  const { getOrgInfo, getOrgDepartments } = useOrg();
  const [needsOnboarding, setneedsOnboarding] = useState(false);
  const [udata, setudata] = useState({ data: "waiting" });
  const [orgData, setorgData] = useState({ data: "waiting" });
  const [userOrgs, setuserOrgs] = useState([]);
  const [orgDepts, setorgDepts] = useState([]);
  const [selectedDepartmentId, setselectedDepartmentId] = useState("");
  const [currentUserRole, setcurrentUserRole] = useState("awaiting data");

  const [isDialogOpen, setisDialogOpen] = useState(false);
  const [addNewOrgNeeded, setaddNewOrgNeeded] = useState(false);

  const [employees, setEmployees] = useRecoilState(employeesAtom);

  const getOrgData = async (orgs) => {
    let processedUserOrgs = [];
    for (const org of orgs) {
      const data = await getOrgInfo(org.id);
      processedUserOrgs.push({ ...data, id: org.id });
    }

    setuserOrgs(processedUserOrgs);
  };

  const changeOrganisation = () => {
    localStorage.removeItem("id");
    getOrgData(udata.organisations);
    setisDialogOpen(true);
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
        getOrgDepartments(currentOrgID).then((departments) => {
          setorgDepts(departments);
        });
      }
    });
  }, [currentUserRole, addNewOrgNeeded]);

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

      <ShiftDialog />

      <MainApp />
    </div>
  );
};

export default AppContainer;
