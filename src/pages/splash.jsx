import { Box, CircularProgress, Typography } from "@material-ui/core";
import { useState } from "react";
import VerticallyCentered from "../components/verticallyCentered";
import logo from "../logo.png";

const SplashScreen = () => {


  //TODO: Once auth is implemented, check for auth status and redirect user as appropriate


  const [showWaitingMessage, setshowWaitingMessage] = useState(false);

  setTimeout(() => setshowWaitingMessage(true), 3000);

  return (
    <VerticallyCentered>
      <Box>
        {/* <img src={logo} style={{maxHeight: "5vh", display:"block", margin: "1rem"}} /> */}

       { /*FIXME: use a theme for this rather than using colours*/}
        <Typography style={{ color: "white" }} gutterBottom variant="h4">
          schedule
        </Typography>
        <CircularProgress color="secondary" size="1.5rem" />
        {showWaitingMessage && (
          <Typography style={{ color: "gray" }} gutterBottom variant="body1">
            hang tight, this is taking longer than normal
          </Typography>
        )}
      </Box>
    </VerticallyCentered>
  );
};

export default SplashScreen;
