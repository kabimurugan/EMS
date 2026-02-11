import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
    console.log("Connected DB:", mongoose.connection.name);
    console.log("DB Host:", mongoose.connection.host);
  } catch (error) {
    console.log("DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
