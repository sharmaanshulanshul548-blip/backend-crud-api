import mongoose from "mongoose";

export async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) {
    throw new Error("MONGODB_URI is missing. Add it to your .env file.");
  }

  const connection = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
