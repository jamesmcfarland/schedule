import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userRoleAtom } from "../atoms";
import { onboardingRequiredAtom } from "../atoms/OnboardingRequiredAtom";
import { userAtom } from "../atoms/UserAtom";
import Rota from "../pages/app/rota";
import Menu from "./menu/menu";
import People from "../pages/app/people";
import SettingsPage from "../pages/app/settings";
import Noticeboard from "../pages/app/noticeboard";

const MainApp = () => {
  const changeOrganisation = () => {
    console.log("broken atm");
  };

  const userRole = useRecoilValue(userRoleAtom);
  const onboardingRequired = useRecoilValue(onboardingRequiredAtom);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "row" }}>
      <Menu
        changeOrganisation={changeOrganisation}
       
      ></Menu>
      {onboardingRequired && <Redirect to="/onboarding" />}

      <Box
        padding="0 1em"
        style={{
          width: "100%",
        }}
      >
        <Switch>
          <Route exact path="/app">
            <Rota />
          </Route>
          <Route path="/app/people" component={People} />
          <Route path="/app/noticeboard" component={Noticeboard} />
          <Route path="/app/settings" component={SettingsPage} />
        </Switch>
      </Box>
    </div>
  );
};

export default MainApp;
