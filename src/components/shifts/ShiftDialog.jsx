import DateTimePicker from "@mui/lab/DateTimePicker";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField
} from "@mui/material";
import _ from "lodash";
import { useRecoilState, useResetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { employeesAtom } from "../../atoms/Employees";
import { shiftAtom } from "../../atoms/Shift";


const ShiftDialog = () => {
  const [targetShift, setTargetShift] = useRecoilState(shiftAtom);
  const resetShiftState = useResetRecoilState(shiftAtom);
  const [employees, setEmployees] = useRecoilState(employeesAtom);

  const addNewShift = (cancel) => {
    if (!cancel) {
      if (!!targetShift.shiftId) {
        //Editing shift
        let newEmployees = _.cloneDeep(employees);
        let index = newEmployees
          .find(
            (employee) => employee.employeeId === targetShift.shiftEmployeeId
          )
          .shifts.findIndex((shift) => shift.shiftId === targetShift.shiftId);
        if (index != -1) {
          const newShift = {
            shiftId: targetShift.shiftId,
            isShift: targetShift.isShift,
            shiftStart: targetShift.shiftStart,
            shiftEnd: targetShift.shiftEnd,
            shiftNotes: targetShift.shiftNotes,
            isClose: targetShift.isClose,
          };

          newEmployees.find(
            (employee) => employee.employeeId === targetShift.shiftEmployeeId
          ).shifts[index] = newShift;
          setEmployees(newEmployees);
        } else {
          console.log("could not find shift id");
        }
      } else {
        //Adding new shift

        let newEmployees = _.cloneDeep(employees);
        newEmployees
          .find(
            (employee) => employee.employeeId === targetShift.shiftEmployeeId
          )
          .shifts.push({
            shiftId: uuidv4(),
            isShift: true,
            shiftStart: targetShift.shiftStart,
            shiftEnd: targetShift.shiftEnd,
            shiftNotes: targetShift.shiftNotes,
            isClose: targetShift.isClose,
          });

        setEmployees(newEmployees);
      }
    }

    resetShiftState();
  };

  const removeShift = () => {
    let newEmployees = _.cloneDeep(employees);
    const shifts = newEmployees.find(
      (employee) => employee.employeeId === targetShift.shiftEmployeeId
    ).shifts;

    newEmployees.find(
      (employee) => employee.employeeId === targetShift.shiftEmployeeId
    ).shifts = shifts.filter((shift) => shift.shiftId !== targetShift.shiftId);

    setEmployees(newEmployees);
    resetShiftState();
  };
  return (
    <Dialog open={!!targetShift.shiftEmployeeName}>
      <DialogContent>
        <DialogTitle>
          {(!!targetShift.shiftId ? `Editing shift for ` : "Add shift for") +
            " " +
            targetShift.shiftEmployeeName}
        </DialogTitle>
        <Stack spacing={2}>
          <DateTimePicker
            label="start"
            value={targetShift.shiftStart}
            onChange={(newValue) =>
              setTargetShift((current) => {
                return {
                  ...current,
                  shiftStart: newValue,
                };
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />

          <FormControlLabel
            control={
              <Switch
                checked={targetShift.isClose}
                onChange={(e) =>
                  setTargetShift((current) => {
                    return {
                      ...current,
                      isClose: e.target.checked,
                    };
                  })
                }
              />
            }
            label="Close shift"
          />

          <DateTimePicker
            disabled={targetShift.isClose}
            label="end"
            value={targetShift.shiftEnd}
            onChange={(newValue) =>
              setTargetShift((current) => {
                return {
                  ...current,
                  shiftEnd: newValue,
                };
              })
            }
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            multiline
            maxRows={4}
            label="notes"
            value={targetShift.shiftNotes}
            onChange={(e) =>
              setTargetShift((current) => {
                return {
                  ...current,
                  shiftNotes: e.target.value,
                };
              })
            }
          />

          <Button
            variant="contained"
            size="small"
            style={{ textTransform: "none" }}
            onClick={() => addNewShift(false)}
          >
            {!!targetShift.shiftId ? "Save changes" : "Add shift"}
          </Button>
          <Button
            variant="text"
            size="small"
            style={{ textTransform: "none" }}
            onClick={() => addNewShift(true)}
          >
            Cancel
          </Button>
          {!!targetShift.shiftId && (
            <Button
              variant="text"
              size="small"
              color="error"
              style={{ textTransform: "none" }}
              onClick={() => removeShift()}
            >
              Remove shift
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftDialog;
