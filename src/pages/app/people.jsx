import {
  Typography,
  List,
  Paper,
  Grid,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import AppPage from "../../components/appPage";
import PeopleList from "../../components/PeopleList";

const peopleFake = [
  {
    firstName: "James",
    lastName: "McFarland",
    roles: ["Bar", "Floor"],
    phone: "+447724819082",
    startDate: new Date("5/20/19"),
    employeeID: 1959,
  },
];

const People = () => {
  return (
    <AppPage
      title="People"
      ChildComponent={
        <Stack>
          <Button  sx={{ textTransform: "none",  }}>Invite to organisation</Button>
          <PeopleList />
        </Stack>
      }
    ></AppPage>
  );
};

export default People;
