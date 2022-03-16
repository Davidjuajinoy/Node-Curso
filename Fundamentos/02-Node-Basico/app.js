const { crearArchivo } = require("./helpers/multiplicar");
// Dependencia de yargs
const {argv} = require('./config/yargs')

console.clear();

/* //?Recibir parametros de linea de comandos sin libreria */
/*  
const [, , arg3 = "base=1"] = process.argv;
const [, base = 1] = arg3.split("=");
if (!base ) {
    throw "Ingrese un valor";
} 
*/

// const base = argv.base.;

// console.log(base);
crearArchivo(argv.b, argv.l,argv.x)
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));
