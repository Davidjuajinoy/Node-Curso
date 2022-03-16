const fs = require("fs");
const colors = require('colors');
colors.enable(0);
const crearArchivo = async (base = 5, list = false, numberX = 10) => {
  try {
    let salida = "";
    for (let i = 1; i <= numberX; i++) {
      salida += `${base}*${i} = ${base * i}\n`;
    }

    if (list) {
      console.log(colors.red.bgWhite("============"));
      console.log(colors.white.bgRed("Tabla de ", base));
      console.log(colors.red.bgWhite("============"));
      console.log(colors.rainbow(salida));
    }

    fs.writeFileSync(`./output/tabla-${base}.txt`, salida);
    return colors.black.bgGreen(`Tabla-${base}.txt creado`);
  } catch (err) {
    return colors.bgRed(err);
  }
};

module.exports = {
  crearArchivo,
};
