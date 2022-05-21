import React, { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "../context/AuthContext";
import { useParams, Params } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useProfile } from "./../context/ProfileContext";
import { useFollow } from "./../context/FollowContext";
import { Moralis } from "moralis";
type profileType = {
  [key: string]: any;
};
function UserProfileInfo() {
  useAccountsChanged();
  const { accounts } = useAuth();
  const { retrieveP, setRetrieveP } = useProfile();
  const { retrieveFollow, setRetrieveFollow } = useFollow();

  const [profileObj, setProfileObj] = useState<profileType>({});
  const { uid } = useParams();
  console.log(`UID: ${uid}`);

  useEffect(() => {
    const getProfileInfo = async (uid: string | undefined) => {
      const ProfileInfo = Moralis.Object.extend("UserProfile");
      const query = new Moralis.Query(ProfileInfo);
      query.equalTo("uid", uid);
      const results = await query.first();
      if (results !== undefined) setProfileObj(results);
      console.log(results);
    };
    getProfileInfo(uid);
  }, [accounts, retrieveFollow, uid]);
  return (
    <>
      <h1>This is profile page</h1>
      <div>
        {Object.keys(profileObj).length !== 0 && (
          <div>
            <div>{profileObj.get("username")}</div>
            <div>Uid: {profileObj.get("uid")}</div>
            <div>Following: {profileObj.get("following")}</div>
            <div>Followers: {profileObj.get("followers")}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfileInfo;

/* 

  const useProfileRefresh = (uid: string | undefined) => {
    const { fetch } = useMoralisQuery(
      "UserProfile",
      (query) => query.equalTo("uid", uid),
      [],
      { autoFetch: true }
    );
    return fetch;
  };
  let fetch = useProfileRefresh(uid);

    console.log(`uid: ${uid}`);
    fetch({
      onSuccess: (profile) => {
        console.log(profile);
        console.log("here");
        setProfileArr(profile);
      },
    });*/
