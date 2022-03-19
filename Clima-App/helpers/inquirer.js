const inquirer = require("inquirer");
require("colors");

const menuQuestion = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Buscar ciudad`,
      },
      {
        value: 2,
        name: `${"2.".green} Historial`,
      },
      {
        value: 0,
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log(" Seleccione una opcion ".red.bgBlack);
  console.log("==========================".green);
  const { opcion } = await inquirer.prompt(menuQuestion);
  return opcion;
};

const pause = async () => {
  console.log("\n");
  return await inquirer.prompt([
    {
      type: "input",
      name: "pause",
      message: `Presione ${"Enter".green} para continuar`,
    },
  ]);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.trim().length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { description } = await inquirer.prompt(question);

  console.log(description);
  return description.trim();
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, i) => {
    return {
      value: `${place.id}`,
      name: `${++i + ".".green} ${place.nombre}`,
    };
  });

  choices.unshift({
    value: '0',
    name: `${0+".".green} Cancelar`,
  })

  const question = [
    {
      type: "list",
      name: "id",
      message: "Seleccione lugar",
      choices: choices,
    },
  ];
  const { id } = await inquirer.prompt(question);
  return id;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "confirm",
      message,
    },
  ];

  const { confirm } = await inquirer.prompt(question);
  return confirm;
};



module.exports = {
  listPlaces,
  inquirerMenu,
  pause,
  readInput
};
