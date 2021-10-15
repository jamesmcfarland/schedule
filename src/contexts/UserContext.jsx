import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "@firebase/auth";
import { createContext, useContext } from "react";
import { auth, firestore} from "../services/firebase";
import { doc, setDoc } from "@firebase/firestore";
import { useState, useEffect } from "react";
const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();

  const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const hasUser = () => currentUser !== null;
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
      }).then(() => {
        //TODO: Actually add in redirection logic here.
        console.log("user added");
      });
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });

    return unsubscribe;
  }, []);
  const value = { signInWithEmail, hasUser, logout, signUpWithEmail };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
