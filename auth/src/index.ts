import mongoose from 'mongoose';
import { app } from './app';
const start = async () => {
  console.log('starting up.....');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('connected to MongoDB');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
};

start();
