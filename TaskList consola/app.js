require("colors");

const {
  inquirerMenu,
  pause,
  ReadInput,
  taskQuestion,
  confirm,
  showListChecklist,
} = require("./helpers/inquirer");
const { saveDB, readDB } = require("./helpers/saveFile");
const { Tasks } = require("./models/tasks");

// const { mostrarMenu, pause } = require("./helpers/messages");

const main = async () => {
  console.clear();

  /*   let opt = "";
  do {
    opt = await mostrarMenu();
    await pause();
  } while (opt !== "0"); */

  let opt = "";
  const tasks = new Tasks();
  const data = readDB();
  if (data != null) {
    tasks.loadData(data);
  }
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const description = await ReadInput("");
        tasks.AddTask(description);
        break;
      case 2:
        tasks.listAll();
        break;
      case 3:
        tasks.listPendingComplete(true);
        break;
      case 4:
        tasks.listPendingComplete(false);
        break;
      case 5:
        const ids =await showListChecklist(tasks.ListArr);
        tasks.completeTask(ids);
        console.log(ids);
        break;
      case 6:
        const id = await taskQuestion(tasks.ListArr);
        if (id === 0) {
          break;
        }
        const confirmDelete = await confirm(`¿Está seguro?`);
        if (confirmDelete) {
          tasks.deleteTask(id);
          console.log(`Tarea Borrada Correctamente`);
        }
        break;
    }

    await pause();

    saveDB(tasks.ListArr);
  } while (opt !== 0);
};

main();
