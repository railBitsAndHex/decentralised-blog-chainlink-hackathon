import React, { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";
import { useAuth } from "../context/AuthContext";
import { useParams, Params } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useProfile } from "./../context/ProfileContext";
import { useFollow } from "./../context/FollowContext";
import { Moralis } from "moralis";
import "../styles/profileInfoGrid.modules.css";
import FollowBtn from "./FollowBtn";
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
      {Object.keys(profileObj).length !== 0 && (
        <section className="dboard-profile-info-sect">
          <section>Profile Image</section>
          <section className="basic-profile-det">
            <div>Account: {profileObj.get("uid")}</div>
            <div>
              Username:{" "}
              {profileObj.get("username") === ""
                ? "-"
                : profileObj.get("username")}
            </div>
            <div>
              Bio: {profileObj.get("bio") === "" ? "-" : profileObj.get("bio")}
            </div>
            <div>Following: {profileObj.get("following")}</div>
            <div>Followers: {profileObj.get("followers")}</div>
            {uid !== accounts[0] && <FollowBtn following={uid} />}
          </section>
        </section>
      )}
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
