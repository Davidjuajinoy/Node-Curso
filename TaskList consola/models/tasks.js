const Task = require("./task");
require("colors");
class Tasks {
  _list;
  constructor() {
    this._list = {};
  }

  AddTask(desc = "") {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  get ListArr() {
    const listArr = [];
    Object.keys(this._list).forEach((key) => {
      listArr.push(this._list[key]);
    });
    return listArr;
  }

  loadData(data) {
    data.forEach((data) => {
      this._list[data.id] = data;
    });
  }

  listAll(list = this.ListArr) {
    const listAll = list.map((task, i) => {
      return `${(++i + ".").green} ${task.description} :: ${
        task.complete ? "Completada".green : "Pendiente".red
      }`;
    });
    return listAll.forEach((task) => console.log(task));
  }

  listPendingComplete(complete = true) {
    const listComplete = this.ListArr.filter(
      (task) => task.complete === complete
    );
    return this.listAll(listComplete);
  }

  deleteTask(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  completeTask(ids = []) {
    this.ListArr.forEach((task) => {
      this._list[task.id].complete = false;
    });

    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.complete) {
        this._list[task.id].complete = true;
      }
    });
  }
}

module.exports = {
  Tasks,
};
