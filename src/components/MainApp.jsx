import { Box } from "@mui/material";
import { Route, Switch } from "react-router-dom";
import Rota from "../pages/app/rota";
import Menu from "./menu/menu";


const MainApp = () => {
    return (  <div style={{ width: "100vw", display: "flex", flexDirection: "row" }}>
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
        <Route exact path="/app">
          <Rota
            departments={orgDepts}
            setselectedDepartmentId={setselectedDepartmentId}
          />
        </Route>
        <Route path="/app/people" component={People} />
        <Route path="/app/noticeboard" component={Noticeboard} />
        <Route path="/app/settings" component={SettingsPage} />
      </Switch>
    </Box>
  </div> );
}
 
export default MainApp;