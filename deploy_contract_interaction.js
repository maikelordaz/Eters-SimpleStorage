const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:7545"
    );
    const privateKey = process.env.PRIVATE_KEY; // From ganache
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
