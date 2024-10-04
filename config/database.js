import mongoose from "mongoose";

let isConnected = false;
const connectToDB = async () => {
  if (isConnected) {
    return console.log("Already connected to DB")
  }
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      dbName: "blog-canvas",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Connected to DB Successfully!");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectToDB;
