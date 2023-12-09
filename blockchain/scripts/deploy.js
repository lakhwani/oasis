async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  const DisasterCrowdfunding = await ethers.getContractFactory('DisasterCrowdfunding');
  const disasterCrowdfunding = await DisasterCrowdfunding.deploy();

  console.log('DisasterCrowdfunding deployed to:', disasterCrowdfunding.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
