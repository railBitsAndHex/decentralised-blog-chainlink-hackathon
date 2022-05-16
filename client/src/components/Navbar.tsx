import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
function Navbar() {
  const { isAuthenticated, error } = useAuth();
  return (
    <>
      {isAuthenticated && (
        <nav>
          <Link to="/create-post">Write Post</Link>
          <Link to="/home">Home</Link>
          <Link to="/blogfeed">Feed</Link>
          <div>{error}</div>
          {isAuthenticated && <Logout />}
        </nav>
      )}
    </>
  );
}

export default Navbar;
