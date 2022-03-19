const fs = require("fs");

const filePatch = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(filePatch, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(filePatch)) {
    return null;
  }

  const data = fs.readFileSync(filePatch, { encoding: "utf-8" });

  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

module.exports = {
  saveDB,
  readDB,
};
