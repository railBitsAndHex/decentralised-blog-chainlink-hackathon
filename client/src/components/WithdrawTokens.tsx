import React from "react";
import { Button } from "react-bootstrap";

import { useTx } from "../context/TransactionContext";
function WithdrawTokens() {
  const { withdraw, setWithdrawDep, withdrawDep } = useTx();
  const handleWithdraw = async () => {
    await withdraw("31337");
    setWithdrawDep(!withdrawDep);
  };
  return (
    <>
      <Button onClick={handleWithdraw} variant="success">
        Claim Tokens
      </Button>
    </>
  );
}

export default WithdrawTokens;
