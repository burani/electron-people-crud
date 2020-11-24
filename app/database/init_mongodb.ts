/* eslint-disable no-console */
/* eslint-disable promise/always-return */
// @ts-ignore
import mongoose from 'mongoose';
import vars from '../constants/vars.json';

mongoose
  .connect(vars.MONGODB_URI, {
    dbName: vars.DB_NAME,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('mongodb connected');
  })
  .catch((err) => console.log(err.message));

// events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db');
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

// fired when ctrl + c is pressed
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
