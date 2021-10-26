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
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import MenuButton from "./menuButton";

const Menu = ({ isVisible, userData: udata, organisationData: orgData, changeOrganisation, currentUserRole }) => {
  const location = useLocation();

  const { logout } = useUser();



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
            <Typography align="left">developer build</Typography>
          )}
        </Grid>
        <Grid item xs={7}>
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
                {currentUserRole}
                </Typography>
                <Typography variant="caption" align="left">
                  {orgData.data === "waiting" ? "" : orgData.name}
                </Typography>
              </Stack>
              <Avatar style={{ border: "2px solid white" }}>JM</Avatar>
            </Stack>
            <Stack direction="column">
            <Button
              variant="text"
              size="small"
              style={{ textTransform: "none" }}
              
              onClick={() => logout()}
            >
              Sign out
            </Button>
            <Button
              variant="text"
              size="small"
              style={{ textTransform: "none" }}
              
              onClick={() => changeOrganisation()}
            >
              Change organisation
            </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Menu;
