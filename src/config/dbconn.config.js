// const mongoose = require("mongoose");

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.DATABASE_URI);
// 	} catch (err) {
// 		throw new Error(err);
// 	}
// };

// module.exports = connectDB;

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    throw new Error(err);
  }
};

export default connectDB;
