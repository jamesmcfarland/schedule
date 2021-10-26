import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import { createContext, useContext } from "react";
import { auth, firestore } from "../services/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
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
        firstName: values.first,
        lastName: values.last,
        organisations: [],
      });
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

  const addUserToOrg = (orgId, role) =>
    getUserInfo().then((userinfo) =>
      setDoc(
        doc(firestore, "users", currentUser.uid),
        {
          organisations: [...userinfo.organisations, {id: orgId, role}],
        },
        { merge: "true" }
      )
    );
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
    getUserInfo,
    addUserToOrg,
  };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
