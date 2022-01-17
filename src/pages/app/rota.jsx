import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppPage from "../../components/appPage";
import ShiftContainer from "../../components/shifts/ShiftContainer";
import { v4 as uuidv4 } from "uuid";

const newEmps = [
  {
    name: "James McFarland",
    employeeId: uuidv4(),
    shifts: [
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 17, 17),
        shiftEnd: new Date(2022, 0, 18, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 18, 10),
        shiftEnd: new Date(2022, 0, 19, 20),
        isClose: false,
        shiftNotes: "bar",
      },
 
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 20, 15),
        shiftEnd: new Date(2022, 0, 21, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 21, 15),
        shiftEnd: new Date(2022, 0, 22, 3),
        isClose: true,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 23, 15),
        shiftEnd: new Date(2022, 0, 24, 3),
        isClose: true,
        shiftNotes: "bar",
      },
     
    ]
  },
  {
    name: "Jude O'Kane",
    employeeId: uuidv4(),
    shifts: [
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 17, 15),
        shiftEnd: new Date(2022, 0, 18, 3),
        isClose: true,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 18, 15),
        shiftEnd: new Date(2022, 0, 19, 20),
        isClose: true,
        shiftNotes: "bar",
      },
 
 
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 21, 12),
        shiftEnd: new Date(2022, 0, 21, 20),
        isClose: false,
        shiftNotes: "bar",
      },
      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 22, 15),
        shiftEnd: new Date(2022, 0, 23, 3),
        isClose: true,
        shiftNotes: "bar",
      },

      {
        isShift: true,
        shiftid: uuidv4(), 
        shiftStart: new Date(2022, 0, 23, 15),
        shiftEnd: new Date(2022, 0, 24, 3),
        isClose: true,
        shiftNotes: "bar",
      },
     
    ]
  }
]

const Rota = () => {
  return (
    <AppPage title="Rota">
      <ShiftContainer employees={newEmps} showShift={(empId, shiftId) => console.log(empId, shiftId)} />
    </AppPage>
  );
};

export default Rota;
