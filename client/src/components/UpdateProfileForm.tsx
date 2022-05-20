import React from "react";
import { useProfile } from "../context/ProfileContext";
import { IUserProfile } from "./../types/profile.d";
function UpdateProfileForm() {
  const { createProfile } = useProfile();
  const tempPObj: IUserProfile = {
    username: "lol",
    bio: "this is lol bio",
  };
  return (
    <>
      <div>
        <button onClick={() => createProfile(tempPObj)}>Update Profile</button>
      </div>
    </>
  );
}

export default UpdateProfileForm;
