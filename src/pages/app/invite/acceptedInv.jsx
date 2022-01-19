import { useEffect } from "react";
import { Redirect, useParams } from "react-router";

const AcceptedInvite = () => {
  const { id } = useParams();

    useEffect(()=>{
        localStorage.setItem("INV", id);
    }, [])

  return <Redirect to="/register"/>;
};

export default AcceptedInvite;
