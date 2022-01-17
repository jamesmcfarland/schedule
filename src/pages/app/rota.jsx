import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppPage from "../../components/appPage";
import ShiftContainer from "../../components/shifts/ShiftContainer";
import { v4 as uuidv4 } from "uuid";

const emps = [
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
  {
    name: "James",
    id: uuidv4(),
    shifts: ["ns", "3-c", "8-c", "1-9", "ns", "3-c", "3-c"],
  },
  {
    name: "Jude",
    id: uuidv4(),
    shifts: ["ns", "3-c", "ns", "ns", "1-9", "5-c", "3-c"],
  },
  {
    name: "Callum",
    id: uuidv4(),
    shifts: ["1-9", "2-c", "1-9", "1-9", "ns", "5-c", "5-c"],
  },
];

const Rota = () => {
  return (
    <AppPage title="Rota">
      <ShiftContainer employees={emps} showShift={(id) => console.log(id)} />
    </AppPage>
  );
};

export default Rota;
