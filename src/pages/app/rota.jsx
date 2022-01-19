import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppPage from "../../components/appPage";
import ShiftContainer from "../../components/shifts/ShiftContainer";
import { v4 as uuidv4 } from "uuid";

const Rota = () => {
  return (
    <AppPage title="Rota">
      <ShiftContainer />
    </AppPage>
  );
};

export default Rota;
