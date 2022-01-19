import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { employeesAtom } from "../../atoms/Employees";
import GridRow from "./GridRow";
import "./shifts.css";

const ShiftContainer = () => {
  const employees = useRecoilValue(employeesAtom);

  return (
    <div className="days-container">
      {[
        "",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((el) => {
        return (
          <p key={el} className="labels">
            {el}
          </p>
        );
      })}

      {employees.map((employee) => {
        return (
          <GridRow
            key={employee.employeeId}
            employee={employee}
            updated={new Date()}
            startDate={new Date(2022, 0, 17)}
          />
        );
      })}
    </div>
  );
};

export default ShiftContainer;
