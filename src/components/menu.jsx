import { Apps, ContentCopy, Settings, Visibility } from "@mui/icons-material";
import {
  Drawer,
  Grid,
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useUser } from "../contexts/UserContext";
import MenuButton from "./menuButton";

const Menu = ({isVisible}) => {
  const location = useLocation();
  console.log(location.pathname);

  const { getUserInfo, logout } = useUser();
  const [udata, setudata] = useState({ data: "wating" });

  useEffect(() => {
    getUserInfo().then((data) => setudata(data));
  }, []);

  return (
    <Box borderRight="2px solid #383838">
      <Grid
        container
        style={{ height: "100vh", padding: "1rem 2rem", width: "20vw" }}
        direction="column"
      >
        <Grid item xs={2}>
          <Typography align="left" variant="h4" style={{ fontWeight: 500 }}>
            schedule
          </Typography>
          {process.env.NODE_ENV === "development" && (
            <Typography align="left">developer build EN:{isVisible.toString()}</Typography>
          )}
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={3}>
            <MenuButton
              isEnabled={isVisible}
              label="Rota"
              startIcon={<Apps />}
              to="/app"
              selected={location.pathname === "/app"}
              />
            <MenuButton
              isEnabled={isVisible}
              label="People"
              to="/app/people"
              startIcon={<Visibility />}
              selected={location.pathname === "/app/people"}
              />
            <MenuButton
              isEnabled={isVisible}
              label="Noticeboard"
              to="/app/noticeboard"
              startIcon={<ContentCopy />}
              selected={location.pathname === "/app/noticeboard"}
              />
            <MenuButton
              isEnabled={isVisible}
              label="Settings"
              to="/app/settings"
              startIcon={<Settings />}
              selected={location.pathname === "/app/settings"}
              />
          </Stack>
        </Grid>
        <Grid item xs>
          <Stack justifyContent="space-between" spacing={1} direction="column">
            <Stack direction="row" spacing={1.5} justifyContent="space-between">
              <Stack justifyContent="start">
                <Typography
                  variant="body1"
                  style={{ fontWeight: 600 }}
                  align="left"
                >
                  {udata.data === "waiting"
                    ? ""
                    : `${udata.firstName} ${udata.lastName}`}
                </Typography>
                <Typography variant="caption" align="left">
                  {udata.data === "waiting"
                    ? ""
                    : udata.role
                    ? udata.role
                    : "no role"}
                </Typography>
              </Stack>
              <Avatar style={{ border: "2px solid white" }}>JM</Avatar>
            </Stack>
            <Button
              variant="text"
              size="small"
              style={{ textTransform: "none" }}
              fullWidth
              onClick={() => logout()}
            >
              Sign out
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
