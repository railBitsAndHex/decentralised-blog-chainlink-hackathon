import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";
function Navbar() {
  const { isAuthenticated, error, accounts } = useAuth();
  useAccountsChanged();
  return (
    <>
      {isAuthenticated && (
        <nav>
          <Link to="/create-post">Write Post</Link>
          <Link to="/home">Home</Link>
          <Link to="/blogfeed">Feed</Link>
          <Link to="/update-profile">UpdateProfile</Link>
          <span>{accounts[0]}</span>
          <div>{error}</div>
          {isAuthenticated && <Logout />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
