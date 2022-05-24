import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import { Moralis } from "moralis";
import { useAccountsChanged, useNetworksChanged } from "../hooks/AuthHooks";
import VaultJson from "../chains/Vault.json";
import MockTokenJson from "../chains/MockToken.json";
import { useAuth } from "./../context/AuthContext";

function DonateTokens() {
  useAccountsChanged();
  useNetworksChanged();
  const { error, setError, accounts } = useAuth();
  const tokenAddress: string =
    process.env.REACT_APP_MOCKTOKEN_ADDRESS!.toString();
  const vaultAddress: string = process.env.REACT_APP_VAULT_ADDRESS!.toString();
  const ethers = Moralis.web3Library;
  const { abi } = MockTokenJson;
  const provider = ethers.getDefaultProvider();
  const accAddr = ethers.utils.getAddress(accounts[0]);
  const vaultAddr = ethers.utils.getAddress(vaultAddress);
  const mockTokenAddr = ethers.utils.getAddress(tokenAddress);
  const readAllowance = async () => {
    await Moralis.enableWeb3();
    const mockTokenContract = new ethers.Contract(tokenAddress, abi, provider);
    const readOptions = {
      contractAddress: mockTokenAddr,
      functionName: "allowance",
      abi: abi,
      params: {
        owner: accAddr,
        spender: vaultAddr,
      },
    };
    const allowance = await Moralis.executeFunction(readOptions);
    console.log(allowance.toString());
  };

  return (
    <>
      {error === "" && (
        <div>
          <Button variant="danger" onClick={readAllowance}>
            Check Allowance
          </Button>
          <Button variant="outline-primary">Donate Mock Tokens</Button>
        </div>
      )}
    </>
  );
}

export default DonateTokens;
