import { createContext, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(userContext);
};

const UserProvider = ({ children }) => {
  const value = {};
  return <UserContext.Provider value={value}> {children}</UserContext.Provider>;
};
