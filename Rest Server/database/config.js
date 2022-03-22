const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      /* Ya vienen activadas en MongoDB v6
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false */
    });
    console.log("Database Online");
  } catch (err) {
    console.log(err);
    throw new Error("Error Database connection");
  }
};

module.exports = {
  dbConnection,
};
