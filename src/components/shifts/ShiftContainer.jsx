import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { employeesAtom } from "../../atoms/atoms";
import GridRow from "./GridRow";
import "./shifts.css"


const ShiftContainer = ({ showShift}) => {

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
        return <p key={el} className="labels">{el}</p>;
      })}

      {employees.map((employee) => {
        return <GridRow key={employee.employeeId} name={employee.name} shifts={employee.shifts} id={employee.employeeId} showShift={showShift} updated={new Date()} startDate={new Date(2022, 0, 17)}/>;
      })}
    </div>
  );
};

export default ShiftContainer;
