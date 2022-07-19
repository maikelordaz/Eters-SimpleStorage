// Este es un script de deploy con ethersjs y ganache

const ethers = require("ethers");
const fs = require("fs-extra");

// RPC provider ganache http://127.0.0.1:7545
// Es buena practica envolver todo en una funcion principal llamada main()
// main() debe ser asincrona
async function main() {
  /*
   * Para conectarme con la blockchain necesito:
   * 1. un proveeedor de RPC
   * 2. una wallet con su llave privada
   * Esto lo hago con ethers
   * yarn add ethers
   * npm i ethers
   */
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const privateKey =
    "4d0f5e6d6e59049b78c6262182b13a45d9296064ba74373a6a00d1534a723a86";
  const wallet = new ethers.Wallet(privateKey, provider);
  /*
   * Luego de conectarme con la blockchain es que puedo lanzar el contrato "deploy".
   * Para esto necesito:
   * 1. el ABI
   * 2. El binario compilado
   * Esto lo obtengo al compilar, el comando esta en el script en el package.json
   * Para leer esos dos archivos voy a necesitar el paquete fs
   * yarn add fs-extra
   * npm i fs-extra
   */
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  /*
   * Luego de tener el abi y el bin necesito un contract factory y le paso:
   * abi para que el codigo sepa como interactuar con el contrato
   * binary porque es el codigo compilado en bajo nivel
   * wallet por la llave privada para el deploy
   */
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  /*
   * Con esto ya esta listo el deploy.
   * Puedo poner algunos console log para ver datos
   */
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // hago el deploy y espero (await)
  console.log(contract);
  //const contract = await contractFactory.deploy({gasPrice : 1000000}); //tambien puedo especificar cosas para el deploy
  //const contract = await contractFactory.deploy({gasLimit : 1000000}); // y mas
}

// Cuando termino ejecuto main(), si falla muestro un error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
