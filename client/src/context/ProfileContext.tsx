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
    const { uid, username, bio, following, followers } = profileObj;
    const UserProfile = Moralis.Object.extend("UserProfile");
    const query = new Moralis.Query(UserProfile);
    query.equalTo("uid", uid);
    try {
      const result = await query.first();
      if (result === undefined) {
        const userProfile = new UserProfile();
        userProfile.set("uid", uid);
        userProfile.set("username", username);
        userProfile.set("bio", bio);
        userProfile.set("following", following);
        userProfile.set("followers", followers);

        try {
          await userProfile.save();
          console.log("New user created!");
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(err.message);
          }
        }
      }
      return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(
          "Oops something went wrong with update, exited before result set"
        );
        console.log(err.message);
      }
    }
  };
  const updateProfile = async (profileObj: IUserProfile) => {
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
          await result.save();
          console.log(`Profile updated successfully!`);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(
              `Something went wrong in update result\nError Message: ${err.message}`
            );
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(
          `Something went wrong with the update\nError Message: ${err.message}`
        );
      }
    }
  };
  const value = { createProfile, updateProfile };
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
