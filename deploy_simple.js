// Este es un script de deploy con ethersjs y ganache

const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(
        "http://127.0.0.1:7545"
    );
    const privateKey =
        "4d0f5e6d6e59049b78c6262182b13a45d9296064ba74373a6a00d1534a723a86";
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
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
