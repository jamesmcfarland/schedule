import { Alert, Button, Snackbar, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  departmentAtom,
  organisationAtom,
  organisationDepartmentsAtom,
  organisationIdAtom,
} from "../../atoms";
import InviteDialog from "../../components/dialogs/InviteDialog";
import PeopleList from "../../components/people/PeopleList";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";

const People = () => {
  const [inviteUserOpen, setinviteUserOpen] = useState(false);
  const organisation = useRecoilValue(organisationAtom);
  const department = useRecoilValue(departmentAtom);
  const organisationDepartments = useRecoilValue(organisationDepartmentsAtom);
  const { getUserInfoById } = useUser();
  const organisationId = useRecoilValue(organisationIdAtom);
  const [people, setpeople] = useState([]);
  const { getOrgInfo } = useOrg();
  const [snackbarOpen, setsnackbarOpen] = useState(false);

  useEffect(() => {
    console.log(organisation.members, organisationDepartments[department]);

    getOrgInfo(organisationId).then((orgData) => {
      const filtered = orgData.members.filter(
        (member) => member.department === department
      );
      let users = [];
      let promises = [];
      for (const user of filtered) {
        promises.push(
          getUserInfoById(user.id).then((data) => {
            return { ...data, role: user.role };
          })
        );
      }

      Promise.all(promises).then((data) => {
        users = data;
        console.log(users);
        setpeople(users);
      });
    });
  }, [department]);

  return (
    <>
      <Snackbar
        open={!!snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setsnackbarOpen("")}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          variant="filled"
          onClose={() => setsnackbarOpen("")}
          severity="success"
        >
          {snackbarOpen}
        </Alert>
      </Snackbar>
      <InviteDialog
        isOpen={inviteUserOpen}
        onClose={(user) => {
          setinviteUserOpen(false);
          setsnackbarOpen(user + " was invited 🥳");
        }}
      />
      <Stack>
        <Button
          sx={{ textTransform: "none" }}
          onClick={() => setinviteUserOpen(true)}
        >
          Invite to organisation
        </Button>

        <PeopleList people={people} />
      </Stack>
    </>
  );
};

export default People;
