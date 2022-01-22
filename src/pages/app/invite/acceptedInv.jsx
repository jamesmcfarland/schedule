import { useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { useSetRecoilState } from "recoil";
import { inviteAtom } from "../../../atoms";

const AcceptedInvite = () => {
  const { id } = useParams();
  const setInvite = useSetRecoilState(inviteAtom);

    useEffect(()=>{
        setInvite(id);
    }, [])

  return <Redirect to="/register"/>;
};

export default AcceptedInvite;
