import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Alert,
  Button,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
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
  const [invitedList, setinvitedList] = useState([]);
  const { getOrgInfo, getInvites } = useOrg();
  const [snackbarOpen, setsnackbarOpen] = useState(false);

  useEffect(() => {
    if (!!department) {
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
      console.log(organisationId, department);
      getInvites(organisationId, department).then((invites) => {
        setinvitedList(invites);
      });
    }
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
        <Box margin={"0.75em"}>
          <Accordion elevation={1} square>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Invited</Typography>
            </AccordionSummary>

            <PeopleList people={invitedList} isInvite={true} />
          </Accordion>
        </Box>
      </Stack>
    </>
  );
};

export default People;
