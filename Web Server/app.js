const express = require("express");

const app = express();

// servir contenido estatico, tiene prioridad 


app.use( express.static('public'))

app.get("/", (req, res) => {
  res.send("hola mundo");
});
app.get("/david", (req, res) => {
  res.send("david");
});
app.get("*", (req, res) => {
    res.sendFile(__dirname+'/public/404.html')
    // res.send("404 | page not found");
});

app.listen(8085);
