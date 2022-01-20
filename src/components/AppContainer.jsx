import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  departmentAtom,
  onboardingRequiredAtom,
  organisationAtom,
  organisationDepartmentsAtom,
  userAtom,
  userOrganisationsAtom,
  userRoleAtom,
} from "../../atoms/";
import MainApp from "../../components/MainApp";
import ShiftDialog from "../../components/shifts/ShiftDialog";
import { useOrg } from "../../contexts/OrgContext";
import { useUser } from "../../contexts/UserContext";
import { organisationIdAtom } from "../atoms";

const AppContainer = () => {
  const { getUserInfo } = useUser();
  const { getOrgInfo, getOrgDepartments } = useOrg();

  const [isDialogOpen, setisDialogOpen] = useState(false);

  //Recoil new
  const [onboardingRequired, setOnboardingRequired] = useRecoilState(
    onboardingRequiredAtom
  );
  const [user, setUser] = useRecoilState(userAtom);
  const setOrganisation = useSetRecoilState(organisationAtom);
  const [selectedDepartmentId, setselectedDepartmentId] =
    useRecoilState(departmentAtom);
  const [currentUserRole, setcurrentUserRole] = useRecoilState(userRoleAtom);
  const [userOrganisations, setUserOrganisations] = useRecoilState(
    userOrganisationsAtom
  );
  const setOrganisationDepartments = useSetRecoilState(
    organisationDepartmentsAtom
  );
  const setorganisationId = useSetRecoilState(organisationIdAtom);

  const getOrgData = async (orgs) => {
    let processedUserOrgs = [];
    for (const org of orgs) {
      const data = await getOrgInfo(org.id);
      processedUserOrgs.push({ ...data, id: org.id });
    }

    setUserOrganisations(processedUserOrgs);
  };

  const changeOrganisation = () => {
    localStorage.removeItem("id");
    getOrgData(user.organisations);
    setisDialogOpen(true);
  };

  useEffect(() => {
     // setcurrentOrgID(localStorage.getItem("id"))
    if (onboardingRequired) {
      return;
    }


    let currentOrgID = localStorage.getItem("id");

    getUserInfo().then((userdata) => {
      setUser(userdata);
      setOnboardingRequired(!userdata.organisations.length);

      if (userdata.organisations.length === 1) {
        currentOrgID = userdata.organisations[0].id;
        console.log(currentOrgID);
      }
      setisDialogOpen(!currentOrgID);

      if (!currentOrgID) {
        console.log(currentOrgID);
        getOrgData(userdata.organisations);
      } else {
        console.log(currentOrgID);
        getOrgInfo(currentOrgID).then((org) => setOrganisation(org));
        setcurrentUserRole(
          userdata.organisations.find((el) => el.id === currentOrgID).role
        );
        getOrgDepartments(currentOrgID).then((departments) => {
          setOrganisationDepartments(departments);

          
        });
      }
    });
  }, [currentUserRole, onboardingRequired]);

  return (
    <div>
      <Dialog open={isDialogOpen} handleClose={() => setisDialogOpen(false)}>
        <DialogTitle>Select organisation</DialogTitle>
        <List>
          {userOrganisations.map((org) => {
            return (
              <ListItem
                button
                onClick={() => {
                  setcurrentUserRole(org.id);
                  localStorage.setItem("id", org.id);
                }}
                key={org.id}
              >
                <ListItemAvatar>
                  <Avatar>{org.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={org.name} />
              </ListItem>
            );
          })}
          <ListItem
            button
            onClick={() => {
              setOnboardingRequired(true);
            }}
            key="NEW"
          >
            <ListItemAvatar>
              <Avatar>+</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add new" />
          </ListItem>
        </List>
      </Dialog>

      <ShiftDialog />

      <MainApp />
    </div>
  );
};

export default AppContainer;
