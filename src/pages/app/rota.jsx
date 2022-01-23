import { DatePicker } from "@mui/lab";
import { Alert, Link, Stack, TextField, Typography } from "@mui/material";
import { addDays, format } from "date-fns";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import GridRow from "../../components/shifts/GridRow";
import "../../components/shifts/shifts.css";

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const ShiftContainer = () => {
  // const employees = useRecoilValue(employeesAtom);
  const organisationId = useRecoilValue(organisationIdAtom);
  const departmentId = useRecoilValue(departmentAtom);
  const shift = useRecoilValue(shiftAtom);
  const organisation = useRecoilValue(organisationAtom);

  const { getShifts, getOrgInfo } = useOrg();

  const [employees, setemployees] = useState([]);

  const { getUserInfoById } = useUser();

  const [selectedStartDate, setSelectedStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [dayNames, setdayNames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!!organisationId && !!departmentId) {
      let tmpDayNames = [];
      console.log(selectedStartDate);
      selectedStartDate.setHours(0, 0, 0, 0);

      for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(selectedStartDate.getDate() + i);
        tmpDayNames.push({ name: days[d.getDay()], date: d });
      }
      console.log(tmpDayNames);
      setdayNames(tmpDayNames);

      getOrgInfo(organisationId).then((orgData) => {
        const filtered = orgData.members.filter(
          (member) => member.department === departmentId
        );
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
            selectedStartDate,
            addDays(selectedStartDate, 7)
          ).then((shifts) => {
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
    }
  }, [shift, organisationId, departmentId, selectedStartDate]);

  return (
    <>
     { !!employees.length && (
      <Stack>
        <Stack direction="row" spacing={2}>
          <DatePicker
            label="Start date"
            value={selectedStartDate}
            onChange={(newValue) => {
              setSelectedStartDate(new Date(newValue.setHours(0, 0, 0, 0)));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
        <div className="days-container">
          {["", ...dayNames].map((el) => {
            return (
              <>
                {el !== "" && (
                  <Stack key={el.name}>
                    <Typography className="labels">{el.name}</Typography>
                    <Typography variant="caption">
                      {format(el.date, "do")}
                    </Typography>
                  </Stack>
                )}
                {el === "" && <p className="labels" key="blnk"></p>}
              </>
            );
          })}

          {employees.map((employee) => {
            return (
              <GridRow
                key={employee.employeeId}
                employee={employee}
                updated={new Date()}
                startDate={selectedStartDate}
              />
            );
          })}
        </div>
      </Stack>
      )}
      {!employees.length && (
        <Alert severity="warning">
          There are no employees in this department! Head over to{" "}
          <Link href="#" onClick={()=>history.push("/app/people")}>people</Link> to add some.
        </Alert>
      )}
    </>
  );
};

export default ShiftContainer;
