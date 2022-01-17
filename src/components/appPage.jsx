import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { format } from "date-fns";

const fakeDepts = [
  "O'Cahans Bar",
  "Coach House",
  "Reception",
  "Spa",
  "Duty Managers",
];

const AppPage = ({ title, children }) => {
  const [dept, setdept] = useState(0);

  const [date, setdate] = useState(format(new Date(), "EEEE, do LLLL yyyy"));
  const [time, settime] = useState(format(new Date(), "HH:mm (OOOO)"));

  setTimeout(() => {
    setdate(format(new Date(), "EEEE, do LLLL yyyy"));
    settime(format(new Date(), "HH:mm (OOOO)"));
  }, 1000);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "1em 0",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{paddingBottom: "1em"}}
      >
        <Stack direction="row" spacing={5} alignItems="center">
          <Typography variant="h5" sx={{ padding: "0 1rem" }}>
            {title}
          </Typography>
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 140, width: "15vw" }}
          >
            <InputLabel id="dept-select">Department</InputLabel>
            <Select
              id="dept-select"
              label="Department"
              value={dept}
              sx={{ textAlign: "left" }}
              onChange={(e) => setdept(e.target.value)}
            >
              {fakeDepts.map((e, i) => {
                return (
                  <MenuItem key={i} value={i}>
                    {e}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>

        <div style={{ display: "inline" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography>{date}</Typography>
            <Typography>{time}</Typography>
          </Stack>
        </div>
      </Stack>

      {children}
    </div>
  );
};

export default AppPage;
