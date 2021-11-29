import { Typography } from "@mui/material";
import { useParams } from "react-router";

const AcceptedInvite = () => {

    const {id} = useParams();


    return ( <Typography>{id}</Typography> );
}
 
export default AcceptedInvite;