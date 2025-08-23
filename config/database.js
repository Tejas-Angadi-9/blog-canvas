import mongoose from "mongoose";

let isConnected = false; // track the connection state

const connectToDB = async () => {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ Successfully connected to MongoDB");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
