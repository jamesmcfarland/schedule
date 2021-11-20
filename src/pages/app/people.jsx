import {
  Typography,
  List,
  Paper,
  Grid,
  Avatar,
  Stack,
  Button,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import AppPage from "../../components/appPage";
import PeopleList from "../../components/PeopleList";

const People = () => {
  const [inviteUserOpen, setinviteUserOpen] = useState(false);

  return (
    <AppPage
      title="People"
      ChildComponent={
        <>
        <Dialog open={inviteUserOpen} >
          <DialogContent >
              <Stack>
                <Typography variant="h5">Invite to organisaton</Typography>
                
                </Stack>
          </DialogContent>
        </Dialog>
        <Stack>
          <Button  sx={{ textTransform: "none",  }} onClick={()=>setinviteUserOpen(true)}>Invite to organisation</Button>
          <PeopleList />
        </Stack>
        </>
      }
    ></AppPage>
  );
};

export default People;
