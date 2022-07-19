const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    /*
     * Para añadir enviromental variables:
     * 1. yarn add dotenv   --- npm i dotenv
     * 2. creo un archivo nuevo .env
     * 3. para tener acceso a las variables que ponga en el .env escribo:
     *    + process.env."el nombre de la variable que quiero acceder en el .env"
     */

    const privateKey = process.env.PRIVATE_KEY;
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

    // Interactuando con el contrato y obtengo el numero favorito
    const currentFavoriteNumber = await contract.retrieve();
    console.log(
        `Current Favorite Number is: ${currentFavoriteNumber.toString()}`
    );
    const transactionResponse = await contract.store("7"); // Como JS no se lleva bien con numeros grandes es buena practica encerrarlos en comillas como strings para que los lea mejor
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
