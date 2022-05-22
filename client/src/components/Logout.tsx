import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/home");
  };
  const styles = {
    btnStyle: { backgroundColor: "#ced4da", marginRight: "10px" },
    btnLabel: {
      color: "#495057",
      fontSize: "1.1em",
    },
  };
  return (
    <>
      <Button
        style={styles.btnStyle}
        appearance="primary"
        onClick={handleLogout}
      >
        <span style={styles.btnLabel}>Logout</span>
      </Button>
    </>
  );
}

export default Logout;
