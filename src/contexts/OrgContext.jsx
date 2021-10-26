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
  const { getUserInfo } = useUser();
  const addNewOrg = async (organisationData, departments, country) => {
    await getUserInfo().then((userInfo) =>
      setDoc(doc(firestore, "organisations", uuidv4()), {
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
    );
  };

  const value = { addNewOrg };
  return <OrgContext.Provider value={value}> {children}</OrgContext.Provider>;
};