import {
  Button, Stack
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { departmentAtom, organisationAtom, organisationDepartmentsAtom } from "../../atoms";
import AppPage from "../../components/appPage";
import InviteDialog from "../../components/InviteDialog";
import PeopleList from "../../components/PeopleList";
import { useUser } from "../../contexts/UserContext";

const People = () => {
  const [inviteUserOpen, setinviteUserOpen] = useState(false);
  const organisation = useRecoilValue(organisationAtom);
  const department = useRecoilValue(departmentAtom);
  const organisationDepartments = useRecoilValue(organisationDepartmentsAtom);
  const {getUserInfoById} = useUser();
  const [people, setpeople] = useState([]);

  useEffect(()=>{
     console.log(organisation.members, organisationDepartments[department]);
  
    const filtered = organisation.members.filter(member=>member.department===department);
    let users = [];
    let promises=[];
    for(const user of filtered){
      promises.push(getUserInfoById(user.id).then((data)=>{
        
        return {...data,role:user.role};
      }));
    }
    

    Promise.all(promises).then((data)=>{
    
        users = data;
        console.log(users);
        setpeople(users);
    })

  },[department])
 
  
  return (
    <AppPage title="People">
      <>
       <InviteDialog isOpen={inviteUserOpen} onClose={()=>setinviteUserOpen(false)}/>
        <Stack>
          <Button
            sx={{ textTransform: "none" }}
            onClick={() => setinviteUserOpen(true)}
          >
            Invite to organisation
          </Button>
          <PeopleList people={people}/>
        </Stack>
      </>
    </AppPage>
  );
};

export default People;
