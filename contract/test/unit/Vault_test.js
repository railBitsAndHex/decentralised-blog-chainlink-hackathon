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
