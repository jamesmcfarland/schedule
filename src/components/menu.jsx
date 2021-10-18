import { Apps, ContentCopy, Settings, Visibility } from "@mui/icons-material";
import { Drawer, Grid, Box, Stack, Typography, Avatar } from "@mui/material";
import { useLocation } from "react-router";
import MenuButton from "./menuButton";


const Menu = () => {
    const location = useLocation();
    console.log(location.pathname);
  return (
    <Drawer variant="permanent" anchor="left" >
      <Grid
        container
        style={{ height: "100vh", padding: "1rem 2rem", width:"20vw" }}
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
        <Grid item xs={9}>
          <Stack spacing={3}>
            <MenuButton
              label="Rota"
              startIcon={<Apps />}
              to="/app"
              selected={location.pathname==="/app"}
            />
            <MenuButton
              label="People"
              to="/app/people"
              startIcon={<Visibility />}
              selected={location.pathname==="/app/people"}
            />
            <MenuButton
              label="Noticeboard"
              to="/app/noticeboard"
              startIcon={<ContentCopy />}
              selected={location.pathname==="/app/noticeboard"}
            />
            <MenuButton
              label="Settings"
              to="/app/settings"
              startIcon={<Settings />}
              selected={location.pathname==="/app/settings"}
            />
          </Stack>
        </Grid>
        <Grid item xs>
          <Box>
            <Stack direction="row" spacing={1.5} justifyContent="space-between">
              <Stack justifyContent="start">
                <Typography
                  variant="body1"
                  style={{ fontWeight: 600 }}
                  align="left"
                >
                  James McFarland
                </Typography>
                <Typography variant="caption" align="left">
                  Manager
                </Typography>
              </Stack>
              <Avatar style={{ border: "2px solid white" }}>JM</Avatar>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default Menu;
