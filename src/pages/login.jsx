import { Box, Card, TextField, Typography } from "@mui/material";
import VerticallyCentered from "../components/verticallyCentered";

const Login = () => {
  return (
    <Box className="fancy-bg">
      <VerticallyCentered>
        <Card
          style={{
            height: "50vh",
            width: "40vw",
            backgroundColor: "#3a3a3a",
            color: "white",
          }}
        >
          <Box padding="2rem" >
            <Typography variant="h4">Sign in</Typography>
            <form noValidate autoComplete="off">
                    <TextField  variant="outlined" label="email address" style={{borderColor:"white"}}>

                    </TextField>
            </form>
          </Box>
        </Card>
      </VerticallyCentered>
    </Box>
  );
};

export default Login;
