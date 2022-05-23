import React, { useEffect, useState } from "react";
import { useFollow } from "../context/FollowContext";
import { useAuth } from "./../context/AuthContext";
import { useProfile } from "./../context/ProfileContext";
import { Moralis } from "moralis";
import { Button } from "rsuite";
interface FollowButtonProps {
  following: string | undefined;
}
type followType = {
  [key: string]: any;
};
function FollowBtn(props: FollowButtonProps) {
  const { followUser, retrieveFollow, unfollowUser } = useFollow();
  const { accounts } = useAuth();
  const { following } = props;
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const getIfFollowing = async (uid: string, fuid: string | undefined) => {
      const FollowInfo = Moralis.Object.extend("Follow");
      const query = new Moralis.Query(FollowInfo);
      query.equalTo("follower", accounts[0]);
      query.equalTo("following", following);
      const results = await query.first();
      setIsFollowing(results === undefined);
    };
    getIfFollowing(accounts[0], following);
  }, [retrieveFollow]);
  const handleFollow = async () => {
    if (!following) return;
    await followUser(accounts[0], following);
  };
  const handleUnfollow = async () => {
    if (!following) return;
    await unfollowUser(accounts[0], following);
  };
  return (
    <>
      <div>
        {isFollowing ? (
          <Button
            size="md"
            color="green"
            appearance="ghost"
            onClick={handleFollow}
          >
            Follow
          </Button>
        ) : (
          <Button
            size="md"
            color="cyan"
            appearance="primary"
            onClick={handleUnfollow}
          >
            Unfollow
          </Button>
        )}
      </div>
    </>
  );
}

export default FollowBtn;
