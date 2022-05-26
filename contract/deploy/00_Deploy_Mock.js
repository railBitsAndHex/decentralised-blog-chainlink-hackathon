const { getNamedAccounts, deployments, network } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`Deploying Mock Token Contract under deployer: ${deployer}`);
  const chainId = network.config.chainId;
  if (chainId == 31337) {
    log("Local network detected! Deploying mock token...");
    await deploy("MockToken", {
      contract: "MockToken",
      from: deployer,
      log: true,
      args: [ethers.utils.parseEther("10000000")],
    });
  } else if (chainId == 5) {
    log("Goerli network detected! Deploying mock token...");
    await deploy("MockToken", {
      contract: "MockToken",
      from: deployer,
      log: true,
      args: [ethers.utils.parseEther("10000000")],
    });
  }
  log("----------------------------------------------------");
};
