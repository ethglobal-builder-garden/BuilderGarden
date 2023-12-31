/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import axios from "axios";
import { ethers, run } from "hardhat";

import {
  ALT,
  BuilderGarden,
  BuilderGardenNft,
  BuilderGardenTBA,
  BuilderGardenTBARegistry,
  BuilderVaultBeacon,
  BuilderVaultFactory,
  BuilderVaultImpl,
} from "../typechain";

let mainDeployer: SignerWithAddress;
let user1: SignerWithAddress;
let user1Tba: BuilderGardenTBA;
let user2: SignerWithAddress;
let user2Tba: BuilderGardenTBA;
let user3: SignerWithAddress;
let user3Tba: BuilderGardenTBA;
let user4: SignerWithAddress;

let user1FundingVault: BuilderVaultImpl;
let user2FundingVault: BuilderVaultImpl;

let builderGardenNft: BuilderGardenNft;
let registryContract: BuilderGardenTBARegistry;
let tbaImpl: BuilderGardenTBA;

let builderGardenContract: BuilderGarden;

let builderVaultImpl: BuilderVaultImpl;
let builderVaultBeacon: BuilderVaultBeacon;
let builderVaultFactory: BuilderVaultFactory;

let altContract: ALT;

async function main() {
  [mainDeployer, user1, user2, user3, user4] = await ethers.getSigners();
  console.log(
    "mainDeployer:",
    mainDeployer.address,
    "\nuser1:",
    user1.address,
    "\nuser2: ",
    user2.address,
    "\nuser3",
    user3.address,
    "\n",
  );
  builderVaultFactory = (await (
    await ethers.getContractFactory("BuilderVaultFactory")
  ).attach("0xfFeF6415C437725820CfaDE5E857d0eF15D0c40b")) as BuilderVaultFactory;

  // export class Vault {
  //   @Prop({ required: true })
  //   title: string;

  //   @Prop({ required: true })
  //   builder: string;

  //   @Prop({ required: false })
  //   vaultContract: string;

  //   @Prop({ required: true })
  //   amount: string;

  //   @Prop({ required: true })
  //   deadline: number;

  //   @Prop({ required: true })
  //   hackathon: string;

  //   @Prop({ required: true })
  //   story: string;
  // }
  const funding = {
    title: "seunganFunding",
    builder: user1.address,
    totalAmount: ethers.utils.parseEther("0.5").toString(),
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    hackathon: "ethParis",
    story: "believe me",
    backers: [],
    currentAmount: ethers.utils.parseEther("0").toString(),
  };

  // await axios.post("http://localhost:3001/vault/", funding);

  const fundingConfig = {
    totalAmount: ethers.utils.parseEther("0.5"),
    deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    title: "seunganFunding",
  };
  // const receipt = await (await builderVaultFactory.connect(user1).deployVault(fundingConfig)).wait();

  // const funding2 = {
  //   title: "help gunwoo",
  //   builder: user2.address,
  //   totalAmount: ethers.utils.parseEther("0.5").toString(),
  //   deadline: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  //   hackathon: "ethParis",
  //   story: "i am gunwoo. korea no.1 hacker.",
  //   backers: [],
  //   currentAmount: ethers.utils.parseEther("0").toString(),
  // };

  // await axios.post("http://100.26.178.122:3001/vault/", funding2);

  // const receipt = await (await builderVaultFactory.connect(user2).deployVault(funding2)).wait();

  user2FundingVault = (await (
    await ethers.getContractFactory("BuilderVaultImpl")
  ).attach("0x8B146cd8dB1CaEa2398bfe82446959E1577E4e97")) as BuilderVaultImpl;

  console.log(await user2FundingVault.getFundedInfo());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.log("error occur");
    console.error(error);
    process.exit(1);
  });
