import React, { useContext } from "react";
import { initialProfileContext } from "../states/profile.s";
import { IProfileContext, ProfilePropsType } from "../types/profile.d";
import { IUserProfile } from "./../types/profile.d";
import { Moralis } from "moralis";

const ProfileContext = React.createContext<IProfileContext>(
  initialProfileContext
);
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }: ProfilePropsType) => {
  const createProfile = async (profileObj: IUserProfile) => {
    const { uid, username, bio } = profileObj;
    const userProfile = Moralis.Object.extend("UserProfile");
    console.log(userProfile);
    const uProfile = new userProfile();
    uProfile.set("uid", uid);
    uProfile.set("username", username);
    uProfile.set("bio", bio);
    try {
      const uProfileData = await uProfile.save();
      console.log(uProfileData);
      console.log("User profile has been saved");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const value = { createProfile };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
