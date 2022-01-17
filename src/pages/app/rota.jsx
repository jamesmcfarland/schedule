import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppPage from "../../components/appPage";
import ShiftContainer from "../../components/shifts/ShiftContainer";
import { v4 as uuidv4 } from "uuid";



const Rota = ({openNewShiftDialog, openEditShiftDialog,employees}) => {

  const shiftHandler = (empId, shiftId, date, isShift) => {
    if(!isShift){
      //Not a shift... 
      openNewShiftDialog(empId, date);
    }
    else {
      openEditShiftDialog(empId, shiftId);
    }
  }

  return (
    <AppPage title="Rota">
      <ShiftContainer employees={employees}  showShift={shiftHandler} />
    </AppPage>
  );
};

export default Rota;
