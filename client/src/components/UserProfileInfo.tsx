import React, { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "../context/AuthContext";
import { useParams, Params } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useProfile } from "./../context/ProfileContext";
function UserProfileInfo() {
  useAccountsChanged();
  const { accounts } = useAuth();
  const { retrieveP, setRetrieveP } = useProfile();
  type profileType = {
    [key: string]: any;
  };
  const [profileArr, setProfileArr] = useState<Array<Object>>([]);
  const paramObj: Readonly<Params<string>> = useParams();
  console.log(paramObj);
  const { uid } = paramObj;
  console.log(`UID: ${uid}`);
  const { fetch } = useMoralisQuery(
    "UserProfile",
    (query) => query.equalTo("uid", uid),
    [],
    { autoFetch: true }
  );
  useEffect(() => {
    fetch({
      onSuccess: (profile) => {
        console.log(profile);
        setProfileArr(profile);
      },
    });
  }, [fetch, accounts, retrieveP]);
  return (
    <>
      <h1>This is profile page</h1>
      <div>
        {profileArr &&
          profileArr.map((profile: profileType) => (
            <div key={profile.get("id")}>
              <h3>{profile.get("username")}</h3>
              <div>{profile.get("bio")}</div>
              <div>Following: {profile.get("following")}</div>
              <div>Followers: {profile.get("followers")}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default UserProfileInfo;
