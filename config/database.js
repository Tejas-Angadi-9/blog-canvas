import mongoose from "mongoose";

const connectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw new Error("Database connection failed");
  }
};

export default connectToDB;
