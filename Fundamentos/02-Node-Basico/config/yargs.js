const argv = require("yargs")
  .option("b", {
    alias: "base",
    demandOption: true,
    type: "number",
    describe: 'Número que se quiere multiplicar.'
  })
  .option("l", {
    alias: "list",
    type: "boolean",
    default: false,
    describe: 'Mostrar la data del txt en consola.'
  })
  .option("x", {
    alias: "numberX",
    type: "number",
    default: 10,
    describe: 'Número limitante a multiplicar.'
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "La base tiene que ser un número";
    }
    if (isNaN(argv.x)) {
      throw "El númeroX tiene que ser un número";
    }
    return true;
  }).argv;

module.exports = {
  argv,
};
