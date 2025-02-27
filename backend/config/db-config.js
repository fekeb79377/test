const mongooose = require("mongoose");
mongoDB = process.env.MONGO_URI;

const connectDB = async () => {
  mongooose.connect(mongoDB)
    .then(() => {
      console.log("Connected to DataBase");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;