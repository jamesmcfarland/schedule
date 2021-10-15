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
    //TODO load user data in here.
  };
  const hasUser = () => {console.log(currentUser); return currentUser !== null};
  const logout = () => {history.push("/");signOut(auth)};
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

  const getUserInfo = () => {
    if(!hasUser) return {}
    
    let userData = {}

    userData.email = auth.currentUser.email;
    userData.emailVerified = auth.currentUser.emailVerified;
    userData.uid = auth.currentUser.uid;

    //TODO: ADD DATA FROM FSTORE
    return userData;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });

    return unsubscribe;
  }, []);
  const value = { signInWithEmail, hasUser, logout, signUpWithEmail, getUserInfo };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
