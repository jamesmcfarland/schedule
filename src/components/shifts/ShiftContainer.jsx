import { useEffect } from "react";
import GridRow from "./GridRow";
import "./shifts.css"


const ShiftContainer = ({employees, showShift}) => {

 

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
        return <GridRow key={employee.employeeId} name={employee.name} shifts={employee.shifts} id={employee.employeeId} showShift={showShift} updated={new Date()} startDate={new Date()}/>;
      })}
    </div>
  );
};

export default ShiftContainer;
