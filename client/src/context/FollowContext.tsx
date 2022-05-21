import React, { useContext } from "react";
import { InitialFollowContext } from "../states/follow.s";
import { IFollowContext, FollowPropsType } from "./../types/follow.d";
import { Moralis } from "moralis";

const FollowContext = React.createContext<IFollowContext>(InitialFollowContext);
export const useFollow = () => useContext(FollowContext);
export const FollowProvider = ({ children }: FollowPropsType) => {
  const followUser = async (uid: string, fuid: string) => {
    /* Three things that need to be done:

      1. Update the follow table
            - in the case of a follow operation, do an insert operation
            - use moralis increment() fn
            - do two checks;
                - check if the curr user exists
                - check if the following user exists
                - check if already followed if both exist
      2. Update the user following count
      3. Update the followed user followed count
      
    */
    if (uid === fuid) return;
    const Follow = Moralis.Object.extend("Follow");
    const UserProfile = Moralis.Object.extend("UserProfile");
    const queryUserProfile = new Moralis.Query(UserProfile);
    const queryFwUserProfile = new Moralis.Query(UserProfile);
    // check if both users exists
    console.log(`uid in follow: ${uid}`);
    console.log(`fid in follow: ${fuid}`);
    queryUserProfile.equalTo("uid", uid);
    queryFwUserProfile.equalTo("uid", fuid);
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      console.log(resultSelf);
      console.log(resultFollow);
      // if they dont return
      if (!(resultSelf && resultFollow)) return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    }
    // From here create the follow
    const queryFollow = new Moralis.Query(Follow);
    queryFollow.equalTo("follower", uid);
    queryFollow.equalTo("following", fuid);
    try {
      const followEntry = await queryFollow.first();
      if (followEntry !== undefined) {
        console.log("Already following!");
        return;
      }
      const follow = new Follow();
      follow.set("follower", uid);
      follow.set("following", fuid);
      try {
        const followData = await follow.save();
        console.log(followData);
        console.log("Follow completed");
        // From here we need to increment the follow and follower count
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`${err.message}`);
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
      }
    }
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      if (resultSelf !== undefined && resultFollow !== undefined) {
        resultSelf.increment("following");
        resultFollow.increment("followers");
        await resultSelf.save();
        await resultFollow.save();
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    }
  };
  const unfollowUser = (uid: string, fuid: string) => {
    /* Three things that need to be done:

      1. Update the follow table
            - in the case of a follow operation, do an insert operation
            - use moralis increment() fn
            - do two checks;
                - check if the curr user exists
                - check if the following user exists
                - check if already followed if both exist
      2. Update the user following count
      3. Update the followed user followed count
      
    */
  };
  const value = { followUser, unfollowUser };
  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
};
