const { inputToConfig } = require("@ethereum-waffle/compiler");
const { getNamedAccounts, deployments, network, ethers } = require("hardhat");
const {
  experimentalAddHardhatNetworkMessageTraceHook,
} = require("hardhat/config");
const whitelistToken = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    const { deploy, log } = deployments;
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
    await VaultContract.whitelistToken(MockTokenContract.address).then((tx) =>
      tx.wait()
    ); //this mint is executed once and then `createFixture` will ensure it is snapshotted
    console.log("Whitelisting of token done");
    console.log(
      "============================ End whitelist fixture ========================="
    );
    // return {
    //   tokenOwner: {
    //     address: deployer,
    //     vContract: VaultContract,
    //     mtContract: MockTokenContract,
    //   },
    // };
  }
);
const approveToken = deployments.createFixture(
  async ({ deployments, getNamedAccounts, ethers }, options) => {
    const { deploy, log } = deployments;
    console.log(
      "========================This is approve token fixture =============================="
    );
    await deployments.fixture(); // ensure you start from a fresh deployments
    const { deployer } = await getNamedAccounts();
    const MockTokenContract = await ethers.getContract("MockToken", deployer);

    const VaultContract = await ethers.getContract("Vault", deployer);
    console.log(`MockTokenContractAddr: ${MockTokenContract.address}`);
    console.log(`VaultContractAddr: ${VaultContract.address}`);
    console.log(`deployer: ${deployer}`);
    await MockTokenContract.approve(deployer, VaultContract.address).then(
      (tx) => tx.wait()
    ); //this mint is executed once and then `createFixture` will ensure it is snapshotted
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
    const VaultContract = ethers.getContract("Vault", deployer);
    const MockTokenContract = ethers.getContract("MockToken", deployer);
    const wlTx = await VaultContract.whitelistToken(MockTokenContract.address);
    await wlTx.wait(1);
    const whiteListedTokens = await VaultContract.viewWhiteListedTokens();
    console.log(whiteListedTokens);
  });
  //   it("Should allow user to donate tokens to a beneficiary", async function () {
  //     await deployments.fixture(["Vault", "MockToken"]);
  //     await whitelistToken();
  //     const { tokenOwner } = await approveToken();
  //     const beneficiary = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
  //     const MockTokenContract = tokenOwner.mtContract;
  //     const mockTokenAddr = MockTokenContract.address;
  //     const VaultContract = tokenOwner.vContract;
  //     console.log("MOCK TOKEN ADDR IN DESC\n");
  //     console.log(mockTokenAddr);
  //     const donateTx = await VaultContract.donate(
  //       10000,
  //       mockTokenAddr,
  //       beneficiary
  //     );
  //     // wait until the transaction is mined
  //     await donateTx.wait();
  //     expect(MockTokenContract.balanceOf(beneficiary)).equal(10000);
  //   });
});
