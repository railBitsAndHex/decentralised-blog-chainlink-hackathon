import { useAuth } from "../context/AuthContext";

const useMMDisconnect = () => {
  const { logoutWallet } = useAuth();
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      await logoutWallet();
    }
  });
};

export { useMMDisconnect };
