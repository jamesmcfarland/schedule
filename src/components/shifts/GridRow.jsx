import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { shiftAtom } from "../../atoms/Shift";

const GridRow = ({ startDate, updated, employee }) => {
  const setShift = useSetRecoilState(shiftAtom);

  const handleClick = (shift) => {
    setShift({
      ...shift,
      isClose: shift.isClose,
      shiftEmployeeName: employee.name,
      shiftEmployeeId: employee.employeeId,
    });
  };

  const [processedShifts, setprocessedShifts] = useState([]);

  const get12From24 = (hour) => {
    return hour <= 12 ? hour : hour - 12;
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  useEffect(() => {
    let procshifts = Array(7);
    for (let i = 0; i < 7; i += 1) {
      const existingShift = employee.shifts.find(
        (shift) => shift.shiftStart.getDay() === addDays(startDate, i).getDay()
      );
      if (existingShift) {
        procshifts[i] = existingShift;
      } else {
        procshifts[i] = {
          isShift: false,
          shiftStart: addDays(startDate, i),
          shiftid: uuidv4(),
          shiftEnd: addDays(startDate, i),
          isClose: false,
        };
      }
    }

    setprocessedShifts(procshifts);
  }, [updated]);
  return (
    <>
      <p className="labels">{employee.name}</p>
      {processedShifts.map((el) => {
        return (
          <button
            type="button"
            className={
              el.isShift === false ? "shift-button-noshift" : "shift-button"
            }
            key={uuidv4()}
            onClick={() => handleClick(el)}
          >
            <p style={{ display: "inline" }}>
              {el.isShift === false
                ? "+"
                : `${get12From24(el.shiftStart.getHours())}-${
                    el.isClose ? "C" : get12From24(el.shiftEnd.getHours())
                  }`}
            </p>
          </button>
        );
      })}
    </>
  );
};

export default GridRow;
