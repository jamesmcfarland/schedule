import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppPage from "../../components/appPage";
import ShiftContainer from "../../components/shifts/ShiftContainer";
import { v4 as uuidv4 } from "uuid";



const Rota = ({openNewShiftDialog, employees}) => {

  const shiftHandler = (empId, shiftId, date) => {
    if(!shiftId){
      //Not a shift... 
      openNewShiftDialog(empId, date);
    }
    else {
      console.log(empId, shiftId)
    }
  }

  return (
    <AppPage title="Rota">
      <ShiftContainer employees={employees}  showShift={shiftHandler} />
    </AppPage>
  );
};

export default Rota;
