import { Stack, Typography } from "@mui/material";

const PeopleCardInfo = ({heading, data}) => {
    return ( <Stack direction="column" >
        <Typography variant="caption" sx={{opacity:0.6}}>{heading}</Typography>
        <Typography>{data}</Typography>
    </Stack> );
}
 
export default PeopleCardInfo;