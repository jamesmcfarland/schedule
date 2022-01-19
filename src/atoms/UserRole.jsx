import { atom } from "recoil";

export const userRoleAtom = atom({
  key: "userRole",
  default: "awaiting data",
});
