import { atom } from "recoil";
import { v4 as uuidv4 } from "uuid";

export const shiftAtom = atom({
  key: "targetShift",
  default: {
    shiftStart: new Date(),
    shiftEnd: new Date(),
    isClose: false,
    shiftEmployeeId: "",
    shiftEmployeeName: "",
    shiftNotes: "",
    shiftId: uuidv4(),
    isShift: false,
  },
});
