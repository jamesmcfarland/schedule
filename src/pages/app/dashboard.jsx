
import { Button, Typography } from "@mui/material";
import VerticallyCentered from "../../components/verticallyCentered";
import { useUser } from "../../contexts/UserContext";

const Dashboard = () => {

    const {getUserInfo, logout} = useUser();
    
    return ( <VerticallyCentered><Typography><code>{JSON.stringify(getUserInfo(), null, 2)}</code></Typography><Button onClick={(e)=>{logout();}}>sign out</Button></VerticallyCentered> );
}
 
export default Dashboard;