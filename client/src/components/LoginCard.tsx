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
      <Container>
        <Content>
          <FlexboxGrid
            className="loginC-fbox-grid"
            justify="end"
            align="middle"
          >
            <FlexboxGrid.Item colspan={8} className="loginC-flexbox-item">
              {cardDes()}
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </>
  );
}

export default LoginCard;
