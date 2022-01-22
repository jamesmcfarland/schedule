import _ from "lodash";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  departmentAtom,
  organisationAtom,
  organisationIdAtom,
  shiftAtom,
} from "../../atoms";
import { employeesAtom } from "../../atoms/Employees";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import GridRow from "./GridRow";
import "./shifts.css";

const ShiftContainer = () => {
  // const employees = useRecoilValue(employeesAtom);
  const organisationId = useRecoilValue(organisationIdAtom);
  const departmentId = useRecoilValue(departmentAtom);
  const shift = useRecoilValue(shiftAtom);
  const organisation = useRecoilValue(organisationAtom);

  const { getShifts, getOrgInfo } = useOrg();

  const [employees, setemployees] = useState([]);

  const { getUserInfoById } = useUser();

  // const fake = {
  //   name: "James McFarland",
  //   employeeId: uuidv4(),
  //   shifts: [
  //     {
  //       isShift: true,
  //       shiftId: uuidv4(),
  //       shiftStart: new Date(2022, 0, 17, 17),
  //       shiftEnd: new Date(2022, 0, 18, 3),
  //       isClose: true,
  //       shiftNotes: "bar",
  //     },
  //   ],
  // };

  useEffect(() => {
    if (!!organisationId && !!departmentId)
      getOrgInfo(organisationId).then((orgData) => {
        const filtered = orgData.members.filter(
          (member) => member.department === departmentId
        );
        let users = [];
        let promises = [];
        for (const user of filtered) {
          promises.push(
            getUserInfoById(user.id).then((data) => {
              return {
                employeeId: user.id,
                name: data.firstName + " " + data.lastName,
                shifts: [],
              };
            })
          );
        }

        Promise.all(promises).then((data) => {
          // console.log(empIdList);
          getShifts(
            organisationId,
            departmentId,
            new Date(2022, 0, 17),
            new Date(2022, 0, 24)
          ).then((shifts) => {
            console.log(shifts);
            let empsWithShifts = _.cloneDeep(data);
            for (let i = 0; i < empsWithShifts.length; i++) {
              for (const shift of shifts) {
                if (shift.employeeId === empsWithShifts[i].employeeId) {
                  empsWithShifts[i].shifts.push(shift);
                }
              }
            }
            setemployees(empsWithShifts);
          });
        });
      });
  }, [shift, organisationId, departmentId]);

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
