const { BigNumber } = require("ethers");

task("whitelist", "whitelist a token for contract").setAction(async () => {
  console.log("whitelisting tasks");
  //   console.log(await deployments);
  const { deployer } = await getNamedAccounts();
  console.log(`\n\n####WHITELISTING TASK####\n\n`);
  console.log(`Deployer: ${deployer}`);
  const Vault = await ethers.getContractFactory("Vault");
  const MockToken = await ethers.getContractFactory("MockToken");

  const vault = await Vault.deploy();

  const mockToken = await MockToken.deploy(
    BigNumber.from("100000000000000000000000")
  );
  console.log(`Vault address: ${vault.address}`);
  console.log(`MockToken Address: ${mockToken.address}`);
  const wlTx = await vault.whitelistToken(mockToken.address);
  wlTx.wait(1);

  console.log("\n\n#################");
});

module.export = {};
