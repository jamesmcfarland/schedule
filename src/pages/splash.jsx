import { Box, CircularProgress, Typography } from "@material-ui/core";
import VerticallyCentered from "../components/verticallyCentered";
import logo from "../logo.png";

const SplashScreen = () => {
  return (
    <VerticallyCentered>
      <Box >
        {/* <img src={logo} style={{maxHeight: "5vh", display:"block", margin: "1rem"}} /> */}
        <Typography style={{color:"white"}} gutterBottom variant="h4">schedule</Typography>
        <CircularProgress color="secondary" size="1.5rem"/>
      </Box>
    </VerticallyCentered>
  );
};

export default SplashScreen;
