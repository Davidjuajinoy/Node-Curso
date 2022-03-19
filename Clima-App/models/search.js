const axios = require("axios");
class Search {
  record = [];
  constructor() {}

  get paramsMapBox() {
    return {
      limit: 5,
      lenguage: "es",
      access_token: process.env.MAPBOX_KEY,
    };
  }
  get paramsWeatherMap() {
    return {
      units: "metric",
      lang: "es",
      appid: process.env.OPENWEATHER_KEY,
    };
  }

  async searchplace(value = "") {
    /*
     *Requets Http Axios
     */
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json`,
        params: this.paramsMapBox,
      });
      const { data } = await instance.get();
      return data.features.map((place) => ({
        id: place.id,
        nombre: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async weatherPlace(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { lat, lon, ...this.paramsWeatherMap },
      });
      const { data } = await instance.get();

      return {
        description: data.weather[0].description,
        min: data.main.temp_min,
        max: data.main.temp_max,
        temp: data.main.temp,
      };
    } catch (err) {
      return err;
    }
  }

  placeSelect(places = [], id = "") {
    return places.find((place) => place.id == id);
  }

  addRecord(place = "") {
    if (
      this.record.find(
        (record) => record.toLocaleLowerCase() == place.toLocaleLowerCase()
      )
    ) {
      return;
    }
    this.record = this.record.slice(0, 5);

    this.record.unshift(place.toLocaleLowerCase());
  }

  get recordTitleCase() {
    return this.record.map((place) => {
      let words = place.split(" ");
      words = words.map((c) => c[0].toUpperCase() + c.substring(1));

      return words.join(" ");
    });
  }
}

module.exports = Search;
