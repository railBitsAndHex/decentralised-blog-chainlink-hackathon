import React from "react";
import { Link } from "react-router-dom";
import { Button } from "rsuite";
import { useAccountsChanged } from "../hooks/AuthHooks";
import { useAuth } from "./../context/AuthContext";
import "../styles/homepage.modules.css";
function HomePage() {
  const { isAuthenticated, accounts } = useAuth();
  useAccountsChanged();
  return (
    <>
      <section className="homepage-sect">
        <div className="homepage-div-1">
          <h2 className="homepage-title">blockPost</h2>
          <div className="homepage-subtitle">The Web3 blogging application</div>
          {!isAuthenticated && (
            <Link to="/login" className="loginLink">
              <Button className="loginPage-btn">
                <span>Get Started</span>
              </Button>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

export default HomePage;
