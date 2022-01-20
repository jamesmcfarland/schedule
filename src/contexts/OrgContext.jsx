import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  where,
} from "@firebase/firestore";
import { createContext, useContext } from "react";
import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { organisationIdAtom } from "../atoms";
import { firestore } from "../services/firebase";
import { useUser } from "./UserContext";

const OrgContext = createContext();

export const useOrg = () => {
  return useContext(OrgContext);
};

export const OrgProvider = ({ children }) => {
  const { getUserInfo } = useUser();

  const setorganisationId = useSetRecoilState(organisationIdAtom);

  const addNewOrg = async (organisationData, departments, country) => {
    const id = uuidv4();
    return getUserInfo().then((userInfo) =>
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
        members: [
          {
            role: "creator",
            id: userInfo.uid,
          },
        ],
      })
    );
  };

  const inviteUserToOrg = (first, last, mobile, email, org) => {
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
      where("email", "==", email),
      where("org", "==", org)
    );
    return getDocs(q).then((qs) => {
      if (!qs.empty) {
        throw Exception("user-already-invited");
      } else {
        console.log(first, last, mobile, email, org);
        getDoc(doc(firestore, "organisations", org)).then((snap) => {
          const data = snap.data();
          console.log(data);
          for (const member of data.members) {
            console.log(member);

            getDoc(doc(firestore, "users", member.id)).then((userSnap) => {
              const userData = userSnap.data();
              console.log(userData);
              if (userData.mobile === mobile || userData.email === email) {
                throw Exception("user-already-member");
              }
            });
          }

          getOrgInfo(org).then((orgData) => {
            addDoc(collection(firestore, "invites"), {
              org: org,
              orgName: orgData.name,
              first: first,
              last: last,
              email: email,
              mobile: mobile,
              status: "pending",
            });
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
    deleteDoc(doc(firestore, "invites", inviteID))
      .then(() => {
        localStorage.removeItem("INV");
      })
      .then(() => {
        updateDoc(doc(firestore, "organisations", organisationId), {
          members: arrayUnion({ id: userId, role: userRole }),
        });
      });
  };

  const getOrgInfo = async (id) => {
    setorganisationId(id);
    const ds = await getDoc(doc(firestore, "organisations", id));

    return { ...ds.data() };
  };

  const getOrgDepartments = async (id) => {
    const ds = await getDoc(doc(firestore, "organisations", id));

    return ds.data().departments;
  };

  const addUserToOrg = (organisationId, userId, userRole) => {
    updateDoc(doc(firestore, "organisations", organisationId), {
      members: arrayUnion({ id: userId, role: userRole }),
    }).then(() => {
      localStorage.removeItem("INV");
    });
  };

  const addNewDept = (deptName, organisationId) => {
    return  updateDoc(doc(firestore, "organisations", organisationId), {
      departments: arrayUnion({name:deptName, id: uuidv4()}),
    })
  }

  const value = {
    addNewOrg,
    addNewDept,
    getOrgInfo,
    inviteUserToOrg,
    getInviteInfo,
    acceptInvite,
    addUserToOrg,
    getOrgDepartments,
  };
  return <OrgContext.Provider value={value}> {children}</OrgContext.Provider>;
};
