import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { Moralis } from "moralis";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
import VaultJson from "../chains/Vault.json";
import MockTokenJson from "../chains/MockToken.json";
import { useAuth } from "../context/AuthContext";
import { useTx } from "../context/TransactionContext";
import ApproveTokens from "./ApproveTokens";
import mappingsJson from "../chains/mappings.json";
import { IMappings } from "../types/txContext";
import DonateTokens from "./DonateTokens";
function DonateApprove() {
  useAccountsChanged();
  useNetworksChanged();
  const [allowance, setAllowance] = useState(0);
  const { approveDep } = useTx();
  const { error, setError, accounts } = useAuth();

  const { abi } = MockTokenJson;
  const mappings: IMappings = mappingsJson;

  const tokenAddress = mappings["chainId"]["31337"]["MockToken"].address;
  const vaultAddress = mappings["chainId"]["31337"]["VaultContract"].address;
  useEffect(() => {
    const readAllowance = async () => {
      await Moralis.enableWeb3();
      const readOptions = {
        contractAddress: tokenAddress,
        functionName: "allowance",
        abi: abi,
        params: {
          owner: accounts[0],
          spender: vaultAddress,
        },
      };
      const allowance = await Moralis.executeFunction(readOptions);
      console.log(allowance.toString());
      setAllowance(parseInt(allowance.toString()));
    };
    readAllowance();
  }, [approveDep]);

  return (
    <>
      {error === "" && (
        <div>{allowance > 0 ? <DonateTokens /> : <ApproveTokens />}</div>
      )}
    </>
  );
}

export default DonateApprove;
