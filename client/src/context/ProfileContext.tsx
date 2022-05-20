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
    const UserProfile = Moralis.Object.extend("UserProfile");
    const query = new Moralis.Query(UserProfile);
    query.equalTo("uid", uid);
    try {
      const result = await query.first();
      if (result !== undefined) {
        try {
          result.set("username", username);
          result.set("bio", bio);
          result.save();
          console.log("update success");
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log("Oops somethign went wrong with update");
            console.log(err.message);
          }
        }
      } else {
        const userProfile = new UserProfile();
        userProfile.set("uid", uid);
        userProfile.set("username", username);
        userProfile.set("bio", bio);
        try {
          const userProfileData = await userProfile.save();
          console.log(userProfileData);
          console.log("New user created!");
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(err.message);
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(
          "Oops something went wrong with update, exited before result set"
        );
        console.log(err.message);
      }
    }
  };
  const value = { createProfile };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
