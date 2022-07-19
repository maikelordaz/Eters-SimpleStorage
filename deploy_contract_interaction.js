const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const privateKey =
    "536940c094941c991c1940d4901ebf106aabfd7686565368591434b6b62261ba";
  const wallet = new ethers.Wallet(privateKey, provider);
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
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
