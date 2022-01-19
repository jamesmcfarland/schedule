import { atom } from "recoil";

export const organisationAtom = atom({
    key: "organisation",
    default: {
        data: "waiting",
    }
})