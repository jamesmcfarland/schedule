import { Typography, List, Paper, Grid, Avatar } from "@mui/material";
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
        <PeopleList/>
      }
    ></AppPage>
  );
};

export default People;
