const { v4: uuidv4 } = require("uuid");

class Task {
  id;
  description;
  complete = false;

  constructor(description) {
    this.id = uuidv4();
    this.description = description;
    this.complete = false;
  }
}

module.exports = Task;
