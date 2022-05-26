import React from "react";

import { Moralis } from "moralis";
import { Button } from "react-bootstrap";
import { useAuth } from "./../context/AuthContext";
import { useTx } from "../context/TransactionContext";
import { BigNumber } from "ethers";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
function ApproveTokens() {
  useAccountsChanged();
  useNetworksChanged();
  const { accounts } = useAuth();
  const { approve } = useTx();
  const handleApprove = async () => {
    await approve("5");
  };
  return (
    <>
      <Button onClick={handleApprove}>Approve</Button>
    </>
  );
}

export default ApproveTokens;
