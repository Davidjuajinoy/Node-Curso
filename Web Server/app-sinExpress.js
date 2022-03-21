const http = require("http");


const server = http.createServer((request, response) => {
  /*   response.writeHead(200, {
    "Content-Type": "application/json",
  });

  const persona = {
    id: 1,
    nombre: "david hernandez",
  };
  response.write(JSON.stri ngify(persona)); */

  response.setHeader("Content-Disposition", "attachment; filename=lista.csv");
  response.writeHead(200, { "Content-Type": "application/csv" });

  response.write("id, nombre\n");
  response.write("1, David\n");
  response.write("2, Sergio\n");

  response.end();
});

server.listen("8085");

console.log("Escuchando el puerto 8085");
