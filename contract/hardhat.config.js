require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("hardhat-spdx-license-identifier");
require("hardhat-deploy-ethers");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const PKEY_1 = process.env.PKEY_1;
const PKEY_2 = process.env.PKEY_2;
const PKEY_3 = process.env.PKEY_3;
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300,
      },
    },
  },
  networks: {
    localhost: {
      chainId: 31337,
      url: process.env.LOCALHOST_URL,
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_URL,
      accounts: [PKEY_1, PKEY_2, PKEY_3],
    },
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
    beneficiary: {
      default: 2,
    },
  },

  // gasReporter: {
  //   enabled: process.env.REPORT_GAS !== undefined,
  //   currency: "USD",
  // },
  // etherscan: {
  //   apiKey: process.env.ETHERSCAN_API_KEY,
  // },
};
/* getNamedAccounts: () => Promise<{ [name: string]: string }>: a function returning an object whose keys are names and values are addresses. It is parsed from the namedAccounts configuration (see Configuration). */
