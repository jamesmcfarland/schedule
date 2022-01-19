import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from "@firebase/firestore";
import { createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { firestore } from "../services/firebase";
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

  const inviteUserToOrg = (first, last, mobile, org) => {
    if (mobile.length === 11) {
      mobile = mobile.substring(1);
    }
    //Check if user is already in the invites collection

    const inviteCollection = collection(firestore, "invites");
    const q = query(
      inviteCollection,
      // where("first", "==", first),
      // where("last", "==", last),
      where("mobile", "==", mobile),
      where("org", "==", org)
    );
    return getDocs(q).then((qs) => {
      if (!qs.empty) {
        throw Exception("user-already-invited");
      } else {
        getOrgInfo(org).then((orgData) => {
          addDoc(collection(firestore, "invites"), {
            org: org,
            orgName: orgData.name,
            first: first,
            last: last,
            mobile: mobile,
            status: "pending",
          });
        });
      }
    });
  };

  const getInviteInfo = (inviteID) => {
    return getDoc(doc(firestore, "invites/", inviteID)).then((snap) => {
      const data = snap.data();

      return data;
    });
  };

  const acceptInvite = (inviteID) => {
    updateDoc(doc(firestore, "invites", inviteID), { status: "accepted" }).then(
      () => {
        localStorage.removeItem("INV");
      }
    );
  };

  const getOrgInfo = async (id) => {
    const ds = await getDoc(doc(firestore, "organisations", id));

    return { ...ds.data() };
  };

  const getOrgDepartments = async (id) => {
    const ds = await getDoc(doc(firestore, "organisations", id));
   
    return ds.data().departments;
  };

  const value = {
    addNewOrg,
    getOrgInfo,
    inviteUserToOrg,
    getInviteInfo,
    acceptInvite,
    getOrgDepartments,
  };
  return <OrgContext.Provider value={value}> {children}</OrgContext.Provider>;
};
