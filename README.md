# decentralised-blog-chainlink-hackathon

## **WARNING**
All code in this repository has **NOT BEEN AUDITED** and **SHOULD NOT** be used for production.
This is especially so for the smart contracts.
I will not be liable for any losses incurred for utilization of code in this repository.


<hr/>

This repository contains the code for a blogging application using web3 technologies. 
Users are able to log in to the application by connecting their Metamask wallet, and can then submit a blog post.
Technologies involved:

- **React**
- **Typescript**
- **Solidity**
- **Javascript**
- **Moralis**
- **Hardhat**


Users can also donate tokens to another user by sending their tokens to the smart contract `Vault.sol`, and the donee wil be able to claim those tokens from the smart contract.

<hr/>

### Guide to setting up

Open up a VSCode terminal instance

````
<!-- navigate into the client folder, containing client side code -->
cd client
<!-- to install all the packages in package.json -->
yarn add
<!-- To start a client side localhost instance -->
yarn start
````
Open up another instance of a VSCode terminal 

```
<!-- navigate to folder containing hardhat project -->
cd contracts
<!-- Install all the necessary packages in package.json -->
yarn add 
<!-- Start up a local instance of hardhat  -->
yarn hardhat node
<!-- Deploy contracts -->
yarn hardhat deploy --network localhost
````

### **REMINDER**
### **PLEASE DO NOT USE A WALLET CONTAINING REAL MONEY TO INTERACT WITH THIS APPLICATION**

