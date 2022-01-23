import { Apps, ContentCopy, Settings, Visibility } from "@mui/icons-material";
import {
  Avatar, Box, Button, Grid, Stack,
  Typography
} from "@mui/material";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import {
  onboardingRequiredAtom, organisationAtom,
  userAtom, userRoleAtom
} from "../../atoms";
import { useUser } from "../../contexts/UserContext";
import MenuButton from "./menuButton";


const Menu = ({ changeOrganisation }) => {
  const onboardingRequired = useRecoilValue(onboardingRequiredAtom);
  const user = useRecoilValue(userAtom);
  const organisation = useRecoilValue(organisationAtom);
  const userRole = useRecoilValue(userRoleAtom);

  const location = useLocation();

  const { logout } = useUser();

  return (
    // <Box borderRight="2px solid #383838" minWidth="150px" background="red" width="20%" maxWidth="300px">
    <div
      style={{
        borderRight: "2px solid #383838",
        minWidth: "150px",
        width: "20%",
        maxWidth: "300px",
      }}
    >
      <Grid
        container
        style={{ height: "100%", padding: "1rem 1vw" }}
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
              isEnabled={!onboardingRequired}
              label="Rota"
              startIcon={<Apps />}
              to="/app"
              selected={location.pathname === "/app/rota"}
            />
            <MenuButton
              isEnabled={!onboardingRequired}
              label="People"
              to="/app/people"
              startIcon={<Visibility />}
              selected={location.pathname === "/app/people"}
            />
            <MenuButton
              isEnabled={!onboardingRequired}
              label="Noticeboard"
              to="/app/noticeboard"
              startIcon={<ContentCopy />}
              selected={location.pathname === "/app/noticeboard"}
            />
            <MenuButton
              isEnabled={!onboardingRequired}
              label="Settings"
              to="/app/settings"
              startIcon={<Settings />}
              selected={location.pathname === "/app/settings"}
            />
          </Stack>
        </Grid>
        <Grid item xs>
          <Box marginTop="auto">
            <Stack
              justifyContent="space-between"
              spacing={1}
              direction="column"
            >
              <Stack
                direction="row"
                spacing={1.5}
                justifyContent="space-between"
              >
                <Stack justifyContent="start">
                  <Typography
                    variant="body1"
                    style={{ fontWeight: 600 }}
                    align="left"
                  >
                    {user.data === "waiting"
                      ? ""
                      : `${user.firstName} ${user.lastName}`}
                  </Typography>
                  <Typography variant="caption" align="left">
                    {userRole}
                  </Typography>
                  <Typography variant="caption" align="left">
                    {organisation.data === "waiting" ? "" : organisation.name}
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
          </Box>
        </Grid>
      </Grid>
    </div>
    // </Box>
  );
};

export default Menu;
