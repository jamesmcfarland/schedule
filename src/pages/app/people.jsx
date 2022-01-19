import {
  Button, Stack
} from "@mui/material";
import { useState } from "react";
import AppPage from "../../components/appPage";
import InviteDialog from "../../components/InviteDialog";
import PeopleList from "../../components/PeopleList";

const People = () => {
  const [inviteUserOpen, setinviteUserOpen] = useState(false);

 
  
  return (
    <AppPage title="People">
      <>
       <InviteDialog isOpen={inviteUserOpen}/>
        <Stack>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => setinviteUserOpen(true)}
          >
            Invite to organisation
          </Button>
          <PeopleList />
        </Stack>
      </>
    </AppPage>
  );
};

export default People;
