import FollowBtn from "../components/FollowBtn";
import UserProfileInfo from "../components/UserProfileInfo";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useParams, Params } from "react-router-dom";
function ProfilePage() {
  const { accounts, error } = useAuth();
  const paramObj: Readonly<Params<string>> = useParams();
  console.log(paramObj);
  const { uid } = paramObj;
  console.log(`UID: ${uid}`);
  useAccountsChanged();
  return (
    <>
      <div>ProfilePage</div>
      <div>Address: {accounts[0]}</div>
      <UserProfileInfo />
      {uid !== accounts[0] && <FollowBtn following={uid} />}
    </>
  );
}

export default ProfilePage;
