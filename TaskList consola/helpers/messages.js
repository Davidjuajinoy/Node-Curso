const { rejects } = require("assert");
const { resolve } = require("path");

require("colors");

const mostrarMenu = () => {
  return new Promise(
    (resolve) => {
      console.clear();
      console.log("==========================".green);
      console.log(" Seleccione una opcion ".green);
      console.log("==========================".green);
      console.log(`${"1.".green} crear tarea`);
      console.log(`${"2.".green} Listar tareas`);
      console.log(`${"3.".green} Listar tareas completadas`);
      console.log(`${"4.".green} Listar tareas pendientes`);
      console.log(`${"5.".green} Completar tareas`);
      console.log(`${"6.".green} Borrar tarea`);
      console.log(`${"0.".green} Salir\n`);

      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      readline.question("Seleccione una opción: ", (opt) => {
        console.log({ opt });
        resolve(opt);
        readline.close();
      });
    },
    (rejects) => {
      return "Error ._.";
    }
  );
};

const pause = () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPresione ${"Enter".green} para continuar\n`, (opt) => {
        readline.close();
        resolve();
    });
  });
};

module.exports = {
  mostrarMenu,
  pause,
};
