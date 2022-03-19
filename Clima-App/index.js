require("dotenv").config(); //ENV

const { saveDB, readDB } = require("./helpers/historyFile");
const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  const search = new Search();
  let opt;
  const data = readDB();
  if (data) {
    search.record = data.records;
  }
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const placeInput = await readInput("Ciudad: ");

        const placesArr = await search.searchplace(placeInput);

        const placeSelectId = await listPlaces(placesArr);

        if (placeSelectId == "0") {
          continue;
        }

        const place = search.placeSelect(placesArr, placeSelectId);

        /* Save record */
        search.addRecord(place.nombre);

        const weather = await search.weatherPlace(place.lat, place.lng);

        console.log(`\nInformacion de la ciudad\n`.green);
        console.log(`${"Ciudad:".green} ${place.nombre}`);
        console.log(`${"Latitud:".green}  ${place.lat}`);
        console.log(`${"Longitud:".green}  ${place.lng}`);
        console.log(`${"Temperatura:".green}  ${weather.temp}`);
        console.log(`${"Mínima:".green}  ${weather.min}`);
        console.log(`${"Máximo:".green}  ${weather.max}`);
        console.log(`${"El clima esta:".green}  ${weather.description}`);
        break;

      case 2:

        search.recordTitleCase.forEach((place, i) => {
          const id = `${++i + "."}`.green;
          
          console.log(`${id} ${place} `);
          //! manera mia :D console.log(`${id} ${place.charAt(0).toUpperCase()}${place.slice(1,place.length)}`);
        });
        break;
    }
    await pause();
    saveDB({ records: search.record });
  } while (opt !== 0);
};

main();
