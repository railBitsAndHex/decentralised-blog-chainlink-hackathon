import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { isAuthenticated, error } = useAuth();
  return (
    <>
      <nav>
        {isAuthenticated && <Logout />}
        <div>{error}</div>
      </nav>
    </>
  );
}

export default Navbar;
