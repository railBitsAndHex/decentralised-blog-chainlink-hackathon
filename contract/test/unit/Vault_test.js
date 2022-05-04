const { inputToConfig } = require("@ethereum-waffle/compiler");
const { getNamedAccounts, deployments, network, ethers } = require("hardhat");
const { expect, assert } = require("chai");

const whitelistToken = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    console.log(
      "========================This is whitelist token fixture =============================="
    );
    await deployments.fixture(); // ensure you start from a fresh deployments
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
    const MockTokenContract = await ethers.getContract("MockToken", deployer);
    try {
      const wlTx = await VaultContract.whitelistToken(
        ethers.constants.AddressZero
      );
      await wlTx.wait(1);
      throw new Error("This TX should NOT pass through");
    } catch (err) {
      assert.equal(
        err.message,
        "Error: VM Exception while processing transaction: reverted with reason string 'Require non-zero'"
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
      assert.equal(
        err.message,
        "Error: VM Exception while processing transaction: reverted with reason string 'Require non-zero'"
      );
    }
  });
});

//yarn hardhat test --deploy-fixture
