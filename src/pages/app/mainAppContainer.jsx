import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Menu from "../../components/menu";
import { useUser } from "../../contexts/UserContext";
import Noticeboard from "./noticeboard";
import OnboardingFlow from "./onboarding/onboarding";
import People from "./people";
import Rota from "./rota";
import SettingsPage from "./settings";

const MainAppContainer = () => {
  const { getUserInfo } = useUser();
  const [needsOnboarding, setneedsOnboarding] = useState(false);

  useEffect(() => {
    getUserInfo().then((ui) => {
      setneedsOnboarding(!ui.organisations.length);
    
    });
    
  }, []);

  return (
    <Box>
      <Stack direction="row">
        <Menu isVisible={!needsOnboarding}></Menu>
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
