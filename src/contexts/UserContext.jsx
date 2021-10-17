import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, onAuthStateChanged
} from "@firebase/auth";
import { createContext, useContext } from "react";
import { auth, firestore} from "../services/firebase";
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
  const hasUser = () => {return currentUser != null};
  const logout = () =>  signOut(auth);
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

  const getUserInfo = async () => {
    console.log("start");
    if(!hasUser()) throw "no user";
    let userData = {}
    console.log("1");
    
    // userData.email = auth.currentUser.email;
    userData.emailVerified = auth.currentUser.emailVerified;
    userData.uid = auth.currentUser.uid;
    
    console.log("2");
    //TODO: ADD DATA FROM FSTORE
    const docSnapshot = await getDoc(doc(firestore, "users", currentUser.uid));
    console.log("3");
    const data = docSnapshot.data();
    console.log("4");
    userData.email = data.email;
    userData.firstName = data.firstName;
    userData.lastName = data.lastName;
    console.log("5");

    return userData;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });
    console.log(currentUser);
    return unsubscribe;
  }, []);
  const value = { signInWithEmail, hasUser, logout, signUpWithEmail, getUserInfo };
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
