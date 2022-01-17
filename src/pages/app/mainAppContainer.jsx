import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import { Link } from "react-router-dom";
import Menu from "../../components/menu/menu";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import Noticeboard from "./noticeboard";
import OnboardingFlow from "./onboarding/onboarding";
import People from "./people";
import Rota from "./rota";
import SettingsPage from "./settings";

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


      <Dialog open={true}>
        <DialogContent >
        <DialogTitle>Add shift</DialogTitle>
            <input type="date" ></input>
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
          <Switch>
            <Route exact path="/app" component={Rota} />
            <Route path="/app/people" component={People} />
            <Route path="/app/noticeboard" component={Noticeboard} />
            <Route path="/app/settings" component={SettingsPage} />
          </Switch>
        </Box>
      </div>
    </div>
  );
};

export default MainAppContainer;
