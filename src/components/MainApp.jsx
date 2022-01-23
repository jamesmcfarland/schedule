import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { onboardingRequiredAtom } from "../atoms/OnboardingRequiredAtom";
import Noticeboard from "../pages/app/noticeboard";
import People from "../pages/app/people";
import Rota from "../pages/app/rota";
import SettingsPage from "../pages/app/settings";
import AppPage from "./appPage";
import Menu from "./menu/menu";

const MainApp = () => {
  const changeOrganisation = () => {
    console.log("broken atm");
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const [pageTitle, setpageTitle] = useState("");
  const location = useLocation();

  useEffect(() => {
    const split = location.pathname.split("/");
    let name = split[split.length - 1];

    setpageTitle(capitalizeFirstLetter(name));
  }, [location.pathname]);

  const onboardingRequired = useRecoilValue(onboardingRequiredAtom);

  return (
    <div style={{ width: "100vw", display: "flex", flexDirection: "row" }}>
      <Menu changeOrganisation={changeOrganisation}></Menu>
      {onboardingRequired && <Redirect to="/onboarding" />}

      <Box
        padding="0 1em"
        style={{
          width: "100%",
        }}
      >
        <AppPage title={pageTitle}>
          <Switch>
            <Route exact path="/app">
              <Redirect to="/app/rota" />
            </Route>
            <Route path="/app/rota" component={Rota} />
            <Route path="/app/people" component={People} />
            <Route path="/app/noticeboard" component={Noticeboard} />
            <Route path="/app/settings" component={SettingsPage} />
          </Switch>
        </AppPage>
      </Box>
    </div>
  );
};

export default MainApp;
