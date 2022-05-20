import FollowBtn from "../components/FollowBtn";
import UserProfileInfo from "../components/UserProfileInfo";
import { useAuth } from "../context/AuthContext";
import { useAccountsChanged } from "../hooks/AuthHooks";
function ProfilePage() {
  const { accounts, error } = useAuth();
  useAccountsChanged();
  return (
    <>
      <div>ProfilePage</div>
      <div>Address: {accounts[0]}</div>
      <UserProfileInfo />
      <FollowBtn />
    </>
  );
}

export default ProfilePage;
