import React from "react";
import { useFollow } from "../context/FollowContext";
import { useAuth } from "./../context/AuthContext";
function FollowBtn() {
  const { followUser } = useFollow();
  const { accounts } = useAuth();
  const handleFollow = () => {
    followUser(accounts[0], "0x06dff4533511268d169ba3b10b519727fc7b5224");
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
