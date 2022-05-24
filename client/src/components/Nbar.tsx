import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useAccountsChanged } from "../hooks/AuthHooks";

import { Navbar, Nav, Dropdown } from "rsuite";
import "../styles/nvbar.modules.css";
import { accShorten } from "../helper/helpFn";
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
      <Navbar style={styles.barStyle} className="nvbar">
        <Navbar.Brand className="nvbar-brand" style={styles.brandStyle}>
          blockPOST
        </Navbar.Brand>
        {isAuthenticated && (
          <Dropdown
            placement="bottomEnd"
            title={accShorten(accounts[0])}
            className="nvbar-dropdown"
          >
            <Link to="home">
              <Dropdown.Item>Home</Dropdown.Item>
            </Link>
            <Link to="blogfeed">
              <Dropdown.Item>View Feed</Dropdown.Item>
            </Link>
            <Link to="create-post">
              <Dropdown.Item>Create new blogpost</Dropdown.Item>
            </Link>
            <Link to={"/profile-page/" + accounts[0]}>
              <Dropdown.Item>Dashboard</Dropdown.Item>
            </Link>
            <Link to="update-profile">
              <Dropdown.Item>Edit Profile</Dropdown.Item>
            </Link>
            <Dropdown.Item>
              <Logout />
            </Dropdown.Item>
          </Dropdown>
        )}
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
