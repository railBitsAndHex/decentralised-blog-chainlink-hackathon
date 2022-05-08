const { inputToConfig } = require("@ethereum-waffle/compiler");
const { getNamedAccounts, deployments, network, ethers } = require("hardhat");
const { expect, assert } = require("chai");

const whitelistToken = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    console.log(
      "========================This is whitelist token fixture =============================="
    );
    // await deployments.fixture(); // ensure you start from a fresh deployments
    const { deployer } = await getNamedAccounts();
    const MockTokenContract = await ethers.getContract("MockToken", deployer);
    const VaultContract = await ethers.getContract("Vault", deployer);
    console.log(`MockTokenContractAddr: ${MockTokenContract.address}`);
    console.log(`VaultContractAddr: ${VaultContract.address}`);
    console.log(`deployer: ${deployer}`);
    const wlTx = await VaultContract.whitelistToken(MockTokenContract.address);
    wlTx.wait(1); //this mint is executed once and then `createFixture` will ensure it is snapshotted
    console.log("Whitelisting of token done");
    console.log(
      "============================ End whitelist fixture ========================="
    );
  }
);
const approveToken = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    const { deploy, log } = deployments;
    console.log(
      "========================This is approve token fixture =============================="
    );
    // await deployments.fixture(); // ensure you start from a fresh deployments
    const { deployer } = await getNamedAccounts();
    const MockTokenContract = await ethers.getContract("MockToken", deployer);
    const VaultContract = await ethers.getContract("Vault", deployer);
    console.log(`MockTokenContractAddr: ${MockTokenContract.address}`);
    console.log(`VaultContractAddr: ${VaultContract.address}`);
    console.log(`deployer: ${deployer}`);
    const approveTx = await MockTokenContract.approve(
      VaultContract.address,
      10001
    );
    await approveTx.wait(1);

    console.log("Approval done");

    console.log(
      "============================ End approveTokens fixture ========================="
    );
    return {
      tokenOwner: {
        address: deployer,
        vContract: VaultContract,
        mtContract: MockTokenContract,
      },
    };
  }
);
describe("Vault", function () {
  it("should allow owner to whitelist token", async () => {
    await deployments.fixture(["Vault", "MockToken"]);
    const { deployer } = await getNamedAccounts();
    const VaultContract = await ethers.getContract("Vault", deployer);
    const MockTokenContract = await ethers.getContract("MockToken", deployer);
    const wlTx = await VaultContract.whitelistToken(MockTokenContract.address);
    await wlTx.wait(1);
    const whiteListedTokens = await VaultContract.viewWhiteListedTokens();
    expect(whiteListedTokens.includes(MockTokenContract.address)).to.equal(
      true
    );
  });
  it("should not allow owner to whitelist the zero address", async () => {
    await deployments.fixture(["Vault", "MockToken"]);
    const { deployer } = await getNamedAccounts();
    const VaultContract = await ethers.getContract("Vault", deployer);
    try {
      const wlTx = await VaultContract.whitelistToken(
        ethers.constants.AddressZero
      );
      await wlTx.wait(1);
      throw new Error("This TX should NOT pass through");
    } catch (err) {
      assert.equal(
        err.message,
<<<<<<< HEAD
        `Error: VM Exception while processing transaction: reverted with custom error 'AddressIsZero1(${ethers.constants.AddressZero})'`
=======
        `Error: VM Exception while processing transaction: reverted with custom error 'AddressIsZero1("${ethers.constants.AddressZero}")'`
>>>>>>> de8098b95d41d4b496b8de8f8d5012e16410fd51
      );
    }
  });

  it("Should allow user to donate tokens to a beneficiary", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const { beneficiary } = await getNamedAccounts();
    const MockTokenContract = tokenOwner.mtContract;
    const mockTokenAddr = MockTokenContract.address;
    const VaultContract = tokenOwner.vContract;
    const donateTx = await VaultContract.donate(
      5000,
      mockTokenAddr,
      beneficiary
    );
    // wait until the transaction is mined
    await donateTx.wait();
    const doneeBalance = await VaultContract.viewBalance(
      beneficiary,
      mockTokenAddr
    );
    assert.equal(doneeBalance, 5000);
  });

  it("should not allow donation to the zero address", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const MockTokenContract = tokenOwner.mtContract;
    const mockTokenAddr = MockTokenContract.address;
    const VaultContract = tokenOwner.vContract;
    try {
      const donateTx = await VaultContract.donate(
        10000,
        mockTokenAddr,
        ethers.constants.AddressZero
      );
      await donateTx.wait(1);
      throw new Error("This TX should NOT pass through");
    } catch (err) {
<<<<<<< HEAD
      expect(err.message).to.be.oneOf([
        `Error: VM Exception while processing transaction: reverted with custom error 'AddressIsZero2(${mockTokenAddr}, ${ethers.constants.AddressZero})'`,
        `Transaction reverted without a reason string`,
      ]);
=======
      assert.equal(
        err.message,
        `Error: VM Exception while processing transaction: reverted with custom error 'AddressIsZero2("${mockTokenAddr}", "${ethers.constants.AddressZero}")'`
      );
>>>>>>> de8098b95d41d4b496b8de8f8d5012e16410fd51
    }
  });

  it("should not allow zero address to be used for donation", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const { beneficiary } = await getNamedAccounts();
    console.log(`B: ${beneficiary}`);
    const VaultContract = tokenOwner.vContract;
    try {
      const donateTx = await VaultContract.donate(
        10000,
        ethers.constants.AddressZero,
        beneficiary
      );
      await donateTx.wait(1);
      throw new Error("This TX should NOT pass through");
    } catch (err) {
      assert.equal(
        err.message,
        `Error: VM Exception while processing transaction: reverted with custom error 'AddressIsZero2("${ethers.constants.AddressZero}", "${beneficiary}")'`
      );
    }
  });

  it("should not allow donation of zero tokens", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const { beneficiary } = await getNamedAccounts();
    console.log(`B: ${beneficiary}`);
    const VaultContract = tokenOwner.vContract;
    const MockTokenContract = tokenOwner.mtContract;
    const mockTokenAddr = MockTokenContract.address;
    try {
      const donateTx = await VaultContract.donate(
        0,
        mockTokenAddr,
        beneficiary
      );
      await donateTx.wait(1);
      throw new Error("This TX should NOT pass through");
    } catch (err) {
      assert.equal(
        err.message,
        `Error: VM Exception while processing transaction: reverted with custom error 'AmountNotMoreThanZero(${0})'`
      );
    }
  });

  it("should allow the beneficiary to withdraw their tokens", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const VaultContract = tokenOwner.vContract;
    const MockTokenContract = tokenOwner.mtContract;
    const mockTokenAddr = MockTokenContract.address;
    const [owner, beneficiary] = await ethers.getSigners();
    const donateTx = await VaultContract.donate(
      5000,
      mockTokenAddr,
      beneficiary.address
    );
    await donateTx.wait(1);
    const doneeBalance = await VaultContract.viewBalance(
      beneficiary.address,
      mockTokenAddr
    );
    console.log(`Donee Balance: ${doneeBalance}`);
    const withdrawTx = await VaultContract.connect(beneficiary).withdraw(
      mockTokenAddr
    );
    withdrawTx.wait(1);
    const doneeBalanceUpdated = await VaultContract.viewBalance(
      beneficiary.address,
      mockTokenAddr
    );
    assert.equal(doneeBalanceUpdated, 0);
  });

  it("should revert / not have any withdrawals for unsupported tokens", async () => {
    await whitelistToken();
    const { tokenOwner } = await approveToken();
    const VaultContract = tokenOwner.vContract;
    const MockTokenContract = tokenOwner.mtContract;
    const mockTokenAddr = MockTokenContract.address;
    const [owner, beneficiary] = await ethers.getSigners();
    const donateTx = await VaultContract.donate(
      5000,
      mockTokenAddr,
      beneficiary.address
    );
    await donateTx.wait(1);
    const doneeBalance = await VaultContract.viewBalance(
      beneficiary.address,
      mockTokenAddr
    );
    console.log(`Donee Balance: ${doneeBalance}`);
    try {
      const withdrawTx = await VaultContract.connect(beneficiary).withdraw(
        ethers.constants.AddressZero
      );
      withdrawTx.wait(1);
    } catch (err) {
      assert.equal(
        err.message,
        "Error: VM Exception while processing transaction: reverted with reason string 'Address: call to non-contract'"
      );
      return;
    }
    throw new Error("This should not pass through");
  });
});

//yarn hardhat test --deploy-fixture
