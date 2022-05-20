import React, { useState, useEffect, useRef } from "react";
import { useProfile } from "../context/ProfileContext";
import { IUserProfile } from "./../types/profile.d";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
function UpdateProfileForm() {
  useAccountsChanged();
  const usernameRef = useRef<HTMLInputElement>(null);
  const bioRef = useRef<HTMLTextAreaElement>(null);
  const { updateProfile } = useProfile();
  const { accounts } = useAuth();
  const createProfileObj = (
    username: string | undefined,
    bio: string | undefined
  ) => {
    if (!(username && bio)) return;
    if (username.length === 0 || bio.length === 0) {
      return;
    }
    console.log(`Username; ${usernameRef}, Bio: ${bio}`);
    return { uid: accounts[0], username: username, bio: bio };
  };
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const usernameVal: string | undefined = usernameRef.current?.value;
    const bioVal: string | undefined = bioRef.current?.value;
    console.log(`Username val: ${usernameVal}`);
    const profileObj: IUserProfile | undefined = createProfileObj(
      usernameVal,
      bioVal
    );
    console.table(profileObj);
    if (profileObj !== undefined) {
      updateProfile(profileObj);
    }
  };
  return (
    <>
      <section>
        <form>
          <label>Username</label>
          <input
            ref={usernameRef}
            type="text"
            minLength={1}
            placeholder="Enter your username"
          />
          <label>Bio</label>
          <textarea
            ref={bioRef}
            placeholder="Enter a short description about yourself"
            rows={5}
            maxLength={100}
          ></textarea>
          <button type="submit" onClick={handleProfileUpdate}>
            Update Profile
          </button>
        </form>
      </section>
    </>
  );
}

export default UpdateProfileForm;
