import {
  createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,
  signOut
} from "@firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../services/firebase";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    //TODO load user data in here.
  };
  const hasUser = () => {
    return currentUser != null;
  };
  const logout = () => signOut(auth);
  const signUpWithEmail = (values) => {
   
    return createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(firestore, "users", user.uid), {
        email: values.email,
        mobile: values.mobile,
        mobileCountry:values.mobileCountry,
        firstName: values.first,
        lastName: values.last,
        organisations: [],
      }).then(() => {
        return user.uid;
      });
    });
  };

  const signUpWithEmailAndAddOrg = (values, orgId, role) => {
    return createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    ).then((userCredential) => {
      const user = userCredential.user;
      setDoc(doc(firestore, "users", user.uid), {
        email: values.email,
        mobile: values.mobile,
        firstName: values.first,
        lastName: values.last,
        mobileCountry:values.mobileCountry,
        organisations: [{
          id: orgId, 
          role: role,
        }],
      })
      return user.uid;
    });
  };

  const getUserInfo = async () => {
    if (!hasUser()) throw "no user";
    let userData = {};

    userData.emailVerified = auth.currentUser.emailVerified;
    userData.uid = auth.currentUser.uid;

    const docSnapshot = await getDoc(doc(firestore, "users", currentUser.uid));

    userData = { ...userData, ...docSnapshot.data() };

    return userData;
  };

  const getUserInfoById = async (id) => {
    const docSnapshot = await getDoc(doc(firestore, "users", id));
    return docSnapshot.data();
  }

 

  // const addUserToOrg = (orgId, role) =>
  //   getUserInfo().then((userinfo) =>
  //     setDoc(
  //       doc(firestore, "users", currentUser.uid),
  //       {
  //         organisations: [...userinfo.organisations, { id: orgId, role }],
  //       },
  //       { merge: "true" }
  //     )
  //   );



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });
    return unsubscribe;
  }, []);
  const value = {
    signInWithEmail,
    hasUser,
    logout,
    signUpWithEmail,
    signUpWithEmailAndAddOrg,
    getUserInfo,
    getUserInfoById
 
  };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
