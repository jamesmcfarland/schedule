import {
  addDoc, arrayUnion, collection, deleteDoc, doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc, where
} from "@firebase/firestore";
import { createContext, useContext } from "react";
import { useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { inviteAtom, organisationIdAtom } from "../atoms";
import { firestore } from "../services/firebase";
import { useUser } from "./UserContext";

const OrgContext = createContext();

export const useOrg = () => {
  return useContext(OrgContext);
};

export const OrgProvider = ({ children }) => {
  const { getUserInfo } = useUser();

  const setorganisationId = useSetRecoilState(organisationIdAtom);
  const setInvite = useSetRecoilState(inviteAtom);

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
        country: country.code,
        departments,
        members: [
          {
            role: "creator",
            id: userInfo.uid,
          },
        ],
      }).then(() => {
        console.log(userInfo.uid, id);
        updateDoc(doc(firestore, "users", userInfo.uid), {
          organisations: arrayUnion({
            id,
            role: "creator",
          }),
        });
      })
    );
  };

  const inviteUserToOrg = (
    first,
    last,
    mobile,
    email,
    mobileCountry,
    departmentId,
    org
  ) => {
    if (mobile.length === 11) {
      mobile = mobile.substring(1);
    }
    //Check if user is already in the invites collection

    const inviteCollection = collection(firestore, "invites");
    const q = query(
      inviteCollection,
      // where("first", "==", first),
      // where("last", "==", last),
      // where("mobile", "==", mobile),
      where("email", "==", email),
      where("org", "==", org)
    );
    return getDocs(q).then((qs) => {
      if (!qs.empty) {
        throw "user-already-invited";
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
                throw "user-already-member";
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
              mobileCountry: mobileCountry,
              departmentId: departmentId,
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

  const acceptInvite = (inviteID, organisationId, deptId, userId, userRole) => {
    deleteDoc(doc(firestore, "invites", inviteID))
      .then(() => {
        setInvite("");
      })
      .then(() => {
        updateDoc(doc(firestore, "organisations", organisationId), {
          members: arrayUnion({
            id: userId,
            role: userRole,
            department: deptId,
          }),
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

  const addUserToOrg = (organisationId, deptId, userId, userRole) => {
    updateDoc(doc(firestore, "organisations", organisationId), {
      members: arrayUnion({ id: userId, role: userRole, department: deptId }),
    }).then(() => {
      setInvite("");
    });
  };

  const addNewDept = (deptName, organisationId) => {
    return updateDoc(doc(firestore, "organisations", organisationId), {
      departments: arrayUnion({ name: deptName, id: uuidv4() }),
    });
  };

  const setShift = (organisationId, data) => {
    return setDoc(
      doc(firestore, "organisations", organisationId, "shifts", data.shiftId),
      data
    );
  };

  const getShifts = (organisationId, departmentId, startDate, endDate) => {
    return getDocs(
      query(
        collection(firestore, "organisations", organisationId, "shifts"),
        where("shiftStart", ">=", startDate),
        where("departmentId", "==", departmentId)
      )
    ).then((qs) => {
      return qs.docs
        .map((doc) => {
          let data = doc.data();
          data = {
            ...data,
            shiftEnd: data.shiftEnd.toDate(),
            shiftStart: data.shiftStart.toDate(),
          };

          return data;
        })
        .filter((shift) => shift.shiftEnd <= endDate);
    });
  };

  const deleteShift = (organisationId, shiftId) => {
    return deleteDoc(
      doc(firestore, "organisations", organisationId, "shifts", shiftId)
    );
  };

  const value = {
    addNewOrg,
    addNewDept,
    getOrgInfo,
    inviteUserToOrg,
    getInviteInfo,
    acceptInvite,
    addUserToOrg,
    getOrgDepartments,
    setShift,
    getShifts,
    deleteShift,
  };
  return <OrgContext.Provider value={value}> {children}</OrgContext.Provider>;
};
