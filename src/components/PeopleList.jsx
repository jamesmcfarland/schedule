import { Edit } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Grid,
  IconButton,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { getCountryCallingCode } from "libphonenumber-js";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";
import {
  departmentAtom,
  organisationAtom,
  organisationDepartmentsAtom,
} from "../atoms";
import { useUser } from "../contexts/UserContext";
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
const PeopleList = ({ people }) => {
  return (
    <>
      {people && (
        <List sx={{ overflow: "auto", maxHeight: "79vh", width: "76vw" }}>
          {people.map((person) => {
            return (
              <Paper
                key={uuidv4()}
                sx={{ margin: "1rem .5rem 1rem 0", borderRadius: ".75rem" }}
              >
                <Grid container alignItems="center" padding="1rem">
                  <Grid item xs={3}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ border: "2px solid white" }} >
                        {person.firstName[0] + person.lastName[0]}
                      </Avatar>
                      <Typography>
                        {person.firstName + " " + person.lastName}
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid item xs={8}>
                    <Stack direction="row" justifyContent="space-around">
                      <PeopleCardInfo heading="Role" data={person.role} />
                      <PeopleCardInfo
                        heading="Mobile Number"
                        data={`(+${getCountryCallingCode(
                          person.mobileCountry
                        )}) ${person.mobile}`}
                      />
                      <PeopleCardInfo heading="Joined" data={"NA"} />
                      <PeopleCardInfo heading="Employee ID" data={"NA"} />
                    </Stack>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </List>
      )}
      {
        people.length===0 && <Alert  severity="info">No users in this department</Alert>
      }
    </>
  );
};

export default PeopleList;
