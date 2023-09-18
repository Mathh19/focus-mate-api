import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async function () {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB is alreay connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL as string, {
      dbName: 'focus-mate',
    });

    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
}