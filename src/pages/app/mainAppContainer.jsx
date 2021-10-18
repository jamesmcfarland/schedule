import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import Menu from "../../components/menu";
import Noticeboard from "./noticeboard";
import People from "./people";
import Rota from "./rota";
import SettingsPage from "./settings";

const MainAppContainer = () => {
  return (
    <Box>
      <Stack direction="row">
      <Menu></Menu>

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
