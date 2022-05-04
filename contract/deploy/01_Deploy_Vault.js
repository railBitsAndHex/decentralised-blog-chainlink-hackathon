const { getNamedAccounts, deployments, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`Deploying Vault Contract under deployer: ${deployer}`);
  const chainId = network.config.chainId;
  console.log(chainId);
  if (chainId == 31337) {
    log("Local network detected! Deploying vault contract...");
    await deploy("Vault", {
      contract: "Vault",
      from: deployer,
      log: true,
      args: [],
    });
    log("----------------------------------------------------");
  } else if (chainId == 5) {
    log("Goerli network detected! Deploying vault contract...");
    await deploy("Vault", {
      contract: "Vault",
      from: deployer,
      log: true,
      args: [],
    });
    log("----------------------------------------------------");
  }
};
