const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
    };

    /* Connect DB */
    this.connectDataBase();
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
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.users, require("../routes/users"));
    this.app.use(this.paths.categories, require("../routes/categories"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server Running port", this.port);
    });
  }

  async connectDataBase() {
    await dbConnection();
  }
}

module.exports = Server;
