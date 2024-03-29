const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
