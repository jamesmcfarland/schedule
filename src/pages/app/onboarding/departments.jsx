import { Delete } from "@mui/icons-material";
import {
  Button, List, Paper, Stack, TextField, Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";


const Departments = ({ setcanContinue, departments, setdepartments }) => {
  const [error, seterror] = useState("");

  useEffect(() => setcanContinue(departments.length), [departments]);
  return (
    <Stack spacing={4}>
      <Typography variant="h6">Departments</Typography>
      <List sx={{ maxHeight: "35vh", overflow: "auto" }}>
        {!!departments.length &&
          departments.map((department) => {
            return (
              <Paper sx={{ margin: "1rem 0" }}>
                {/* <CardContent> */}
                <Stack
                  direction="row"
                  sx={{ padding: "1.25rem" }}
                  alignItems="center"
                >
                  <Typography variant="body1">{department.name}</Typography>
                  <Button
                    size="small"
                    sx={{ textTransform: "none", marginLeft: "auto" }}
                    onClick={() => {
                      setdepartments(
                        departments.filter(
                          (arrayDept) => arrayDept.id !== department.id
                        )
                      );
                    }}
                  >
                    <Delete />
                  </Button>
                </Stack>
                {/* </CardContent> */}
              </Paper>
            );
          })}
        {!departments.length && (
          <Typography variant="caption">nothing to show!</Typography>
        )}
      </List>
      <form
        id="main-form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          if (e.target.dept.value) {
            setdepartments((old) => [
              ...old,
              { name: e.target.dept.value, id: uuidv4() },
            ]);
            seterror("");
            document.getElementById("main-form").reset();
          } else {
            seterror("Required");
          }
        }}
      >
        <Stack direction="row">
          <TextField
            name="dept"
            label="department name"
            error={!!error}
            helperText={error !== "" ? error : ""}
            fullWidth
            sx={{ marginRight: "auto" }}
          />
          <Button
            type="submit"
            sx={{ textTransform: "none", marginLeft: "1rem" }}
          >
            add
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Departments;
