import React from "react";
import "../styles/profileInfoGrid.modules.css";
import TokenBalanceInfo from "./TokenBalanceInfo";
import WithdrawTokens from "./WithdrawTokens";
import { useAuth } from "./../context/AuthContext";
import { useParams } from "react-router-dom";
function TokenBalance() {
  const { uid } = useParams();
  const { accounts } = useAuth();
  return (
    <>
      <section className="token-balance-sect">
        {accounts[0] === uid ? (
          <div className="token-balance-all">
            <div className="token-bal-title">Token Balance</div>
            <TokenBalanceInfo />
            <WithdrawTokens />
          </div>
        ) : (
          <div className="token-balance-all">
            <div className="token-bal-title">Token Balance</div>
            <div>Cannot view the user balance</div>
          </div>
        )}
      </section>
    </>
  );
}

export default TokenBalance;
