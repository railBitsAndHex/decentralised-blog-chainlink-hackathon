import React from "react";
import { useFollow } from "../context/FollowContext";
import { useAuth } from "./../context/AuthContext";
import { useProfile } from "./../context/ProfileContext";
interface FollowButtonProps {
  following: string | undefined;
}
function FollowBtn(props: FollowButtonProps) {
  const { followUser } = useFollow();
  const { accounts } = useAuth();
  const { setRetrieveP, retrieveP } = useProfile();
  const { following } = props;
  const handleFollow = async () => {
    if (!following) return;
    await followUser(accounts[0], following);
    setRetrieveP(!retrieveP);
  };
  return (
    <>
      <div>
        <button onClick={handleFollow}>Follow</button>
      </div>
    </>
  );
}

export default FollowBtn;
