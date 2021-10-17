import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import VerticallyCentered from "../../components/verticallyCentered";
import { useUser } from "../../contexts/UserContext";

const Dashboard = () => {
  const { getUserInfo, logout } = useUser();
  const [udata, setudata] = useState({ data: "wating" });
  const [error, seterror] = useState();

  useEffect(() => {
    getUserInfo().then((data) => setudata(data)).catch(err=>setError(err.code))
  },[]);

  return (
    <VerticallyCentered>
         {error && <Alert severity="error">{error}</Alert>}
       
      <Typography>
        <code>{JSON.stringify(udata, null, 2)}</code>
      </Typography>
      <Button
        onClick={(e) => {
          logout();
        }}
      >
        sign out
      </Button>
    </VerticallyCentered>
  );
};

export default Dashboard;
