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
import { getCountryCallingCode } from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";
import PeopleCardInfo from "./PeopleCardInfo";
import "./people.css";

const PeopleList = ({ people, isInvite }) => {
  return (
    <>
      {people && (
     
        <div>
          {people.map((user) => {
            return (
              <div className="people-li">
                <Avatar className="people-avatar">
                  <Typography>
                    {user.firstName[0] + user.lastName[0]}
                  </Typography>
                </Avatar>
                <Typography>
                  {user.firstName} {user.lastName}
                </Typography>
                <PeopleCardInfo
                  heading="Mobile Number"
                  data={`(+${getCountryCallingCode(user.mobileCountry)}) ${
                    user.mobile
                  }`}
                />
                <PeopleCardInfo heading="Email address" data={user.email} />
                {isInvite && <PeopleCardInfo heading="Status" data="pending" />}
                {!isInvite && (
                  <button className="people-button-deactivate">
                    <Typography className="text" variant="caption">
                      deactivate
                    </Typography>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
      {people.length === 0 && (
        <Alert severity="info">No users in this department</Alert>
      )}
    </>
  );
};

export default PeopleList;
