import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";

import { Navbar, Nav } from "rsuite";
function Nbar() {
  const { isAuthenticated, error, accounts } = useAuth();
  useAccountsChanged();
  const styles = {
    barStyle: {
      color: "#dee2e6",
    },
    brandStyle: {
      fontSize: "1.4em",
      fontWeight: "700",
      color: "#212529",
      letterSpacing: "1px",
    },
  };
  return (
    <>
      <Navbar style={styles.barStyle}>
        <Navbar.Brand style={styles.brandStyle}>blockPOST</Navbar.Brand>
      </Navbar>
    </>
  );
}

export default Nbar;

/* 

          <Nav.Item>
            <Link to={`profile-page/` + accounts[0]}>ProfilePage</Link>
          </Nav.Item>
          <Nav.Item></Nav.Item>
          <Nav.Item></Nav.Item>{" "}
          <Link to={`profile-page/` + accounts[0]}>ProfilePage</Link>{" "}
          <Link to="/update-profile">UpdateProfile</Link> <span>{error}</span>
*/
