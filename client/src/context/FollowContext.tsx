import React, { useState, useContext } from "react";
import { InitialFollowContext } from "../states/follow.s";
import { IFollowContext, FollowPropsType } from "./../types/follow.d";
import { Moralis } from "moralis";

const FollowContext = React.createContext<IFollowContext>(InitialFollowContext);
export const useFollow = () => useContext(FollowContext);
export const FollowProvider = ({ children }: FollowPropsType) => {
  const [retrieveFollow, setRetrieveFollow] = useState(false);
  const followUser = async (uid: string, fuid: string) => {
    if (uid === fuid) return;
    const Follow = Moralis.Object.extend("Follow");
    const UserProfile = Moralis.Object.extend("UserProfile");
    const queryUserProfile = new Moralis.Query(UserProfile);
    const queryFwUserProfile = new Moralis.Query(UserProfile);
    // check if both users exists
    queryUserProfile.equalTo("uid", uid);
    queryFwUserProfile.equalTo("uid", fuid);
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      // if they dont return
      if (!(resultSelf && resultFollow)) return;
    } catch (err: unknown) {
      if (err instanceof Error) {
      }
    }
    // From here check if already following
    const queryFollow = new Moralis.Query(Follow);
    queryFollow.equalTo("follower", uid);
    queryFollow.equalTo("following", fuid);
    try {
      const followEntry = await queryFollow.first();
      // if already following then return
      if (followEntry !== undefined) {
        return;
      }
      // from here create new follow
      const follow = new Follow();
      follow.set("follower", uid);
      follow.set("following", fuid);
      try {
        const followData = await follow.save();
      } catch (err: unknown) {
        if (err instanceof Error) {
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
      }
    }
    // From here we need to increment the follow and follower count
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      if (resultSelf !== undefined && resultFollow !== undefined) {
        resultSelf.increment("following");
        resultFollow.increment("followers");
        await resultSelf.save();
        await resultFollow.save();
        setRetrieveFollow(!retrieveFollow);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    }
  };
  const unfollowUser = async (uid: string, fuid: string) => {
    if (uid === fuid) return;
    const Follow = Moralis.Object.extend("Follow");
    const UserProfile = Moralis.Object.extend("UserProfile");
    const queryUserProfile = new Moralis.Query(UserProfile);
    const queryFwUserProfile = new Moralis.Query(UserProfile);
    // check if both users exists
    queryUserProfile.equalTo("uid", uid);
    queryFwUserProfile.equalTo("uid", fuid);
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      // if they dont return
      if (!(resultSelf && resultFollow)) return;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
    // Check if they are already following each other
    const queryFollow = new Moralis.Query(Follow);
    queryFollow.equalTo("follower", uid);
    queryFollow.equalTo("following", fuid);
    try {
      const followEntry = await queryFollow.first();
      // if they do not follow each other then return
      if (followEntry === undefined) {
        return;
      }
      // else destroy the follow entry
      await followEntry.destroy();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
    // From here we need to decrement the follow and follower count
    try {
      const resultSelf = await queryUserProfile.first();
      const resultFollow = await queryFwUserProfile.first();
      if (resultSelf !== undefined && resultFollow !== undefined) {
        resultSelf.decrement("following");
        resultFollow.decrement("followers");
        await resultSelf.save();
        await resultFollow.save();
        setRetrieveFollow(!retrieveFollow);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(`${err.message}`);
      }
    }
  };
  const value = { followUser, unfollowUser, retrieveFollow, setRetrieveFollow };
  return (
    <FollowContext.Provider value={value}>{children}</FollowContext.Provider>
  );
};
