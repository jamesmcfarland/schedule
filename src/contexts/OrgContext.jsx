import { createContext, useContext } from "react";
import { auth, firestore } from "../services/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "./UserContext";

const OrgContext = createContext();

export const useOrg = () => {
  return useContext(OrgContext);
};

export const OrgProvider = ({ children }) => {
  const { getUserInfo, addUserToOrg } = useUser();

  const addNewOrg = async (organisationData, departments, country) => {
    const id = uuidv4();
    return getUserInfo()
      .then((userInfo) =>
        setDoc(doc(firestore, "organisations", id), {
          creator: userInfo.uid,
          name: organisationData.orgName,
          addressLine1: organisationData.orgAddrLine1,
          addressLine2: organisationData.orgAddrLine2,
          city: organisationData.orgCity,
          postcode: organisationData.orgPostCode,
          phone: organisationData.orgPhoneContact,
          country,
          departments,
        })
      )
      .then((e) => addUserToOrg(id, "Creator"));
  };

  const getOrgInfo = async (id) => {
    const ds = await getDoc(doc(firestore, "organisations", id));

    return { ...ds.data() };
  };

  const value = { addNewOrg, getOrgInfo };
  return <OrgContext.Provider value={value}> {children}</OrgContext.Provider>;
};
