import React, { useContext } from "react";
import { initialProfileContext } from "../states/profile.s";
import { IProfileContext, ProfilePropsType } from "../types/profile.d";
import { IUserProfile } from "./../types/profile.d";

const ProfileContext = React.createContext<IProfileContext>(
  initialProfileContext
);
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: ProfilePropsType) => {
  const createProfile = (profileObj: IUserProfile) => {
    console.log("Hello from profileContext");
  };
  const value = { createProfile };
  return <ProfileContext.Provider value={value}></ProfileContext.Provider>;
};
