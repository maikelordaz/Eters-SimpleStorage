/*
* [solidity] es sincrono, va en orden
* [javascript] puede ser asincrono, lo que quiere decir que puedo tener codigo ocurriendo 
* al mismo tiempo, puedo hacer cosas mientra algo mas pasa.
* Las funciones asincronas generan una promesa que puede ser
* async function -> Promise
* Promise -> + Pending
*            + Fulfilled
*            + Rejected
* Para esperar una promesa uso la palabra "await"
* Un ejemplo de como escribirlas

async function startMovieNight() {
  await cookPopcorn();
  await pourDrinks();
  startMovie();
}

function cookPopcorn() {
  /// some code here
  return Promise (  /// Some code here  );
}
*/
