const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    // puede ser con enviromental variables
    const RPC_URL =
        "https://eth-rinkeby.alchemyapi.io/v2/IZVmweRhRkLzN9U7F9oyoWkZxPZvGaM9";
    const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const privateKey =
        "aa770c456b00f6d385be32742457aa73b8c9119eea3c5270826892a2baa749e1";
    const wallet = new ethers.Wallet(privateKey, provider);
    const abi = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.abi",
        "utf8"
    );
    const binary = fs.readFileSync(
        "./SimpleStorage_sol_SimpleStorage.bin",
        "utf8"
    );
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    console.log(`Contract address: ${contract.address}`);
    const currentFavoriteNumber = await contract.retrieve();
    console.log(
        `Current Favorite Number is: ${currentFavoriteNumber.toString()}`
    );
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await transactionResponse.wait(1);
    const updatedFavoriteNumber = await contract.retrieve();
    console.log(
        `Updated Favorite Number is: ${updatedFavoriteNumber.toString()}`
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
