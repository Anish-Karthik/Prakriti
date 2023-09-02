import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {

  mongoose.set("strictQuery", true);

  if(!process.env.MONGO_URI) return console.log('=> no MONGO_URI provided');

  if (isConnected) {
    return console.log('=> using existing database connection');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('=> using new database connection');
  } catch (error) {
    console.log('=> error connecting to database');
  }
};