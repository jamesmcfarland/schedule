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
        return <GridRow key={employee.id} name={employee.name} shifts={employee.shifts} id={employee.id} showShift={showShift}/>;
      })}
    </div>
  );
};

export default ShiftContainer;
