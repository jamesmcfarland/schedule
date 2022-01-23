import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import VerticallyCentered from "../components/verticallyCentered";
import { useUser } from "../contexts/UserContext";

const SplashScreen = () => {


  //TODO: Once auth is implemented, check for auth status and redirect user as appropriate
  const history = useHistory();
  const {hasUser} = useUser();

  const [showWaitingMessage, setshowWaitingMessage] = useState(false);

  // setTimeout(() => setshowWaitingMessage(true), 1000);


  useEffect(()=>{ 
    if(hasUser()){
      history.push("/app");
    }
    else {
      history.push("/login");
    }
  })

  return (
    <VerticallyCentered>
      <Box>
       
        <Typography  gutterBottom variant="h4">
          schedule
        </Typography>
        <CircularProgress color="secondary" size="1.5rem" />
        {showWaitingMessage && (
          <Typography color="GrayText" gutterBottom variant="body1">
            hang tight, this is taking longer than normal
          </Typography>
        )}
      </Box>
    </VerticallyCentered>
  );
};

export default SplashScreen;
