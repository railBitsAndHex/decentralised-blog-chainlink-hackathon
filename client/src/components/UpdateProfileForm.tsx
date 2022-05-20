import React, { useState, useEffect } from "react";
import { useProfile } from "../context/ProfileContext";
import { IUserProfile } from "./../types/profile.d";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
function UpdateProfileForm() {
  useAccountsChanged();
  const { createProfile } = useProfile();
  const { accounts } = useAuth();
  const tempPObj: IUserProfile = {
    uid: accounts[0],
    username: "lol",
    bio: "this is lol bio",
  };
  const handleProfileUpdate = () => {
    createProfile(tempPObj);
    console.log("Pcontext");
  };
  return (
    <>
      <div>
        <button onClick={() => handleProfileUpdate()}>Update Profile</button>
      </div>
    </>
  );
}

export default UpdateProfileForm;
