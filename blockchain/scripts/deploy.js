async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with ', deployer.address);

  const DisasterCrowdfunding = await ethers.getContractFactory('DisasterCrowdfunding');
  const contract = await DisasterCrowdfunding.deploy();

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress()

  console.log("Contract Address:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
