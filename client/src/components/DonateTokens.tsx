import React, { useState, useRef } from "react";

import { useTx } from "../context/TransactionContext";
import { useAuth } from "../context/AuthContext";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import { Form } from "rsuite";
function DonateTokens() {
  const { uid } = useParams();
  const { accounts } = useAuth();
  const { donate } = useTx();
  const [value, setValue] = useState<string>("0");
  const valueRef = useRef<HTMLInputElement>(null);

  const handleDonate = async () => {
    if (accounts[0] === uid) return;
    if (uid === undefined) return;
    if (checkIfNotFloat(value)) setValue("0");
    const hardCodedDonate = ethers.utils.parseEther(value);
    await donate(hardCodedDonate, uid, "31337");
    setValue("0");
  };
  const checkIfNotFloat = (inputStr: string): boolean => {
    console.log(`input: ${inputStr}`);
    console.log(parseFloat(inputStr) === NaN);
    return isNaN(parseFloat(inputStr));
  };
  const handleChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (valueRef.current !== undefined && valueRef.current !== null)
      setValue(valueRef.current.value);
  };
  return (
    <>
      <InputGroup>
        <FormControl
          ref={valueRef}
          value={value}
          placeholder="Enter amount of tokens to donate"
          onChange={handleChange}
        />
      </InputGroup>
      <Button onClick={handleDonate}>Donate Tokens</Button>
    </>
  );
}

export default DonateTokens;
