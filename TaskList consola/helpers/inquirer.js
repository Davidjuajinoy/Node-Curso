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
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: 2,
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: 3,
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: 4,
        name: `${"4.".green} Listar tarea pendientes`,
      },
      {
        value: 5,
        name: `${"5.".green} Completar tareas`,
      },
      {
        value: 6,
        name: `${"6.".green} Borrar tareas`,
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

const ReadInput = async (message) => {
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

const taskQuestion = async (task = []) => {
  const choices = task.map((task, i) => {
    return {
      value: `${task.id}`,
      name: `${++i + ".".green} ${task.description}`,
    };
  });

  choices.unshift({
    value: 0,
    name: `${0+".".green} Cancelar`,
  })

  const question = [
    {
      type: "list",
      name: "id",
      message: "¿Cual desea Eliminar",
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


const showListChecklist = async (task = []) => {
  const choices = task.map((task, i) => {
    return {
      value: `${task.id}`,
      name: `${++i + ".".green} ${task.description}`,
      checked: task.complete
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices: choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  ReadInput,
  taskQuestion,
  confirm,
  showListChecklist
};
