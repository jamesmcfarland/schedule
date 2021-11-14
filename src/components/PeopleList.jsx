import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import PeopleCardInfo from "./PeopleCardInfo";

const peopleFake = [
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1959,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1939,
  },
];
const PeopleList = () => {
  return (
    <List sx={{overflow:"auto", maxHeight: "84vh", width: "76vw"}}>
      {peopleFake.map((person) => {
        console.log(person);
        return (
          <Paper
            key={person.employeeID + person.firstName}
            sx={{ margin: "1rem .5rem 1rem 0", borderRadius:".75rem" }}
            
          >
            <Grid container alignItems="center" padding="1rem">
              <Grid item xs={3}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ border: "2px solid white" }}>
                    {person.firstName[0] + person.lastName[0]}
                  </Avatar>
                  <Typography>
                    {person.firstName + " " + person.lastName}
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={8}>
                <Stack direction="row" justifyContent="space-around">
                  <PeopleCardInfo
                    heading="Roles"
                    data={person.roles.join(", ")}
                  />
                  <PeopleCardInfo heading="Mobile Number" data={person.phone} />
                  <PeopleCardInfo
                    heading="Joined"
                    data={format(person.startDate, "LLLL yyyy")}
                  />
                  <PeopleCardInfo
                    heading="Employee ID"
                    data={person.employeeID}
                  />
                </Stack>
              </Grid>
                <Grid item xs={1}>
                 <IconButton>
                     <Edit/>
                 </IconButton>
                </Grid>
            </Grid>
          </Paper>
        );
      })}
    </List>
  );
};

export default PeopleList;
