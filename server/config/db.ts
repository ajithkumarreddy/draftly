import mongoose, { ConnectOptions } from "mongoose";

// MongoDB connection
const ConnectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || undefined;

  const clientOptions: ConnectOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
  };

  try {
    await mongoose.connect(mongoURI as string, clientOptions);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

export default ConnectDB;