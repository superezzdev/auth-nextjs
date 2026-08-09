import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI! as string);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error . Please make sure the MongoDB server is running",
        err,
      );
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    console.log(error);
  }
}
