import React, { useState, useContext } from "react";
import { InitialTxContext } from "../states/TxContext.s";
import { ITxContext, TSendOptions, TxPropsType } from "./../types/txContext.d";
import { BigNumber } from "ethers";
import { Moralis } from "moralis";
import MockTokenJson from "../chains/MockToken.json";
import VaultJson from "../chains/Vault.json";
import mappingJson from "../chains/mappings.json";
import { IMappings } from "./../types/txContext.d";
const TxContext = React.createContext<ITxContext>(InitialTxContext);

export const useTx = () => useContext(TxContext);

export const TxProvider = ({ children }: TxPropsType) => {
  const [approveDep, setApproveDep] = useState<boolean>(false);
  const [donatedDep, setDonatedDep] = useState<boolean>(false);

  const ethers = Moralis.web3Library;

  const mappings: IMappings = mappingJson;
  const approve = async (chainId: string) => {
    const provider = await Moralis.enableWeb3({ provider: "metamask" });
    const signer = provider.getSigner();
    const { abi } = MockTokenJson;
    const mockTokenAddr = mappings["chainId"][chainId]["MockToken"].address;
    const vaultContractAddress =
      mappings["chainId"][chainId]["VaultContract"].address;
    const maxInt: BigNumber = ethers.constants.MaxUint256;

    const mockTokenContract = new ethers.Contract(mockTokenAddr, abi, signer);
    try {
      const approveTx = await mockTokenContract.approve(
        vaultContractAddress,
        maxInt
      );
      const receipt = await approveTx.wait();
      if (receipt.status === 1) setApproveDep(!approveDep);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const donate = async (amounts: BigNumber, donee: string, chainId: string) => {
    const provider = await Moralis.enableWeb3({ provider: "metamask" });
    const signer = provider.getSigner();
    const { abi } = VaultJson;
    const mockTokenAddr = mappings["chainId"][chainId]["MockToken"].address;
    const vaultContractAddress =
      mappings["chainId"][chainId]["VaultContract"].address;

    const vaultContract = new ethers.Contract(
      vaultContractAddress,
      abi,
      signer
    );
    try {
      const donateTx = await vaultContract.donate(
        amounts,
        mockTokenAddr,
        donee
      );
      const donateTxReceipt = await donateTx.wait();
      if (donateTxReceipt.status === 1) {
        setDonatedDep(!donatedDep);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        console.log(err.message);
      }
    }
  };

  const withdraw = async (chainId: string) => {
    const provider = await Moralis.enableWeb3({ provider: "metamask" });
    const signer = provider.getSigner();
    const { abi } = VaultJson;
    const mockTokenAddr = mappings["chainId"][chainId]["MockToken"].address;
    const vaultContractAddress =
      mappings["chainId"][chainId]["VaultContract"].address;

    const vaultContract = new ethers.Contract(
      vaultContractAddress,
      abi,
      signer
    );
    try {
      const withdrawTx = await vaultContract.withdraw(mockTokenAddr);
      const withdrawTxReceipt = await withdrawTx.wait();
      if (withdrawTxReceipt.status === 1) {
        setDonatedDep(!donatedDep);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        console.log(err.message);
      }
    }
  };

  const value = {
    approveDep,
    setApproveDep,
    donatedDep,
    setDonatedDep,
    approve,
    withdraw,
    donate,
  };
  return <TxContext.Provider value={value}>{children}</TxContext.Provider>;
};
