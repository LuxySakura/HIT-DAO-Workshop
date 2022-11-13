const hre = require("hardhat");

async function main() {
    const contract_address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const Greeting = await hre.ethers.getContractFactory("Greeting");
    const contract = Greeting.attach(contract_address);
    const greeting = await contract.greet();
    console.log(greeting)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});