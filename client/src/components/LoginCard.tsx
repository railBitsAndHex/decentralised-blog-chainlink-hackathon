import React from "react";
import LoginBtn from "./LoginBtn";
import { Container, Content, FlexboxGrid, Panel } from "rsuite";
import "../styles/loginCard.modules.css";
function LoginCard() {
  const cardDes = () => {
    return (
      <div className="loginCard-desc">
        <h3>Log in to blockPost</h3>
        <p>Its simple. You just need a Metamask wallet!</p>
        <LoginBtn />
      </div>
    );
  };
  return (
    <>
      <section className="loginC-container">
        <div className="loginC-fbox-grid">
          <div className="loginC-flexbox-item">{cardDes()}</div>
        </div>
      </section>
    </>
  );
}

export default LoginCard;
