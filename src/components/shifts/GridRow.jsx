import { useEffect, useState } from "react";

const GridRow = ({ name, shifts, id, showShift, startDate }) => {
  const handleClick = (e) => {};

  const [processedShifts, setprocessedShifts] = useState([]);



  const get12From24 = hour => {
  
    return hour <= 12 ? hour : hour-12;
  }

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }



  useEffect(() => {
    let procshifts = Array(7);
    for (let i = 0; i < 7; i += 1) {
      let shiftToAdd = {};
      const existingShift = shifts.find(
        (shift) =>
          shift.shiftStart.getDay() === addDays(startDate, i).getDay() 
      );
      if (existingShift) {
        procshifts[i] = existingShift;
      } else {
        procshifts[i] = {
          isShift: false,
        };
      }
    }

    setprocessedShifts(procshifts);
  }, [shifts]);
  return (
    <>
      <p className="labels">{name}</p>
      {processedShifts.map((el) => {
        return (
          <button
            type="button"
            className={el.isShift===false ? "shift-button-noshift" : "shift-button"}
            key={el.shiftid}
            onClick={() => showShift(id, el.shiftid)}
          >
            <p style={{ display: "inline" }}>{el.isShift===false? "+" : `${get12From24(el.shiftStart.getHours())}-${el.isClose?"C":get12From24(el.shiftEnd.getHours())}`}</p>
          </button>
        );
      })}
    </>
  );
};

export default GridRow;
