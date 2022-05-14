import { useAuth } from "../context/AuthContext";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
function ProfilePage() {
  const { accounts, error } = useAuth();
  useAccountsChanged();
  useNetworksChanged();
  return (
    <>
      <div>ProfilePage</div>
      <div>Address: {accounts[0]}</div>
    </>
  );
}

export default ProfilePage;
