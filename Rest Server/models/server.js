const express = require("express");
var cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    /* Middlewares
     */
    this.middleware();

    /* Routes */
    this.routes();
  }

  middleware() {
    // *cors
    this.app.use(cors());

    //* Lectura y parse del body a  json (serializar)
    this.app.use(express.json());

    // *Public file
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running port", this.port);
    });
  }
}

module.exports = Server;
