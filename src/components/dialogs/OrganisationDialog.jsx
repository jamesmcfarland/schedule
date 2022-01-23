import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  onboardingRequiredAtom,
  userOrganisationsAtom,
  userRoleAtom
} from "../../atoms";

const OrganisationDialog = ({ isDialogOpen }) => {
  const userOrganisations = useRecoilValue(userOrganisationsAtom);
  const setCurrentUserRole = useSetRecoilState(userRoleAtom);
  const setOnboardingRequired = useSetRecoilState(onboardingRequiredAtom);

  return (
    <Dialog open={isDialogOpen} handleClose={() => setisDialogOpen(false)}>
      <DialogTitle>Select organisation</DialogTitle>
      <List>
        {userOrganisations.map((org) => {
          return (
            <ListItem
              button
              onClick={() => {
                setCurrentUserRole(org.id);
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
  );
};

export default OrganisationDialog;
