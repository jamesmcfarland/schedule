import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
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
  const [currentOrgID, setcurrentOrgID] = useState();
  const [userOrgs, setuserOrgs] = useState([]);

  const [isDialogOpen, setisDialogOpen] = useState(false);

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
    setcurrentOrgID(); //unecessary, but forces a reload
  }

  useEffect(() => {
    setcurrentOrgID(localStorage.getItem("id"));

    getUserInfo().then((userdata) => {
      setudata(userdata);
      setneedsOnboarding(!userdata.organisations.length);
      console.log(currentOrgID)
      setisDialogOpen(!currentOrgID);

      if (!currentOrgID) {
        getOrgData(userdata.organisations);
      } else {
        getOrgInfo(currentOrgID).then((org) => setorgData(org));
      }
    });
  }, [currentOrgID]);

  return (
    <Box>
      <Dialog open={isDialogOpen} handleClose={() => setisDialogOpen(false)}>
        <DialogTitle>Select organisation</DialogTitle>
        <List>
          {userOrgs.map((org) => {
            return (
              <ListItem
                button
                onClick={() => {
                  setcurrentOrgID(org.id);
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
        </List>
      </Dialog>

      <Stack direction="row">
        <Menu
          isVisible={!needsOnboarding}
          organisationData={orgData}
          userData={udata}
          changeOrganisation={changeOrganisation}
        ></Menu>
        {needsOnboarding && <Redirect to="/onboarding" />}

        <Box padding="1rem">
          <Switch>
            <Route exact path="/app" component={Rota} />
            <Route path="/app/people" component={People} />
            <Route path="/app/noticeboard" component={Noticeboard} />
            <Route path="/app/settings" component={SettingsPage} />
          </Switch>
        </Box>
      </Stack>
    </Box>
  );
};

export default MainAppContainer;
