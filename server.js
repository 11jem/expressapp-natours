const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling uncaught exceptions
process.on('uncaughtException', err => {
  console.log('Uncaught Exception! 💢 Shutting down...');
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Connecting to remote database
mongoose
  .connect(encodeURI(DB), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection was successful!'));

// Starting up server
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handling promise rejections
process.on('unhandledRejection', err => {
  console.log('Unhandled Rejection! 💢 Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});

// Responding to heroku's sigterm event
process.on('SIGTERM', () => {
  console.log('🔆 SIGTERM RECEIVED. Shutting down gracefully');

  server.close(() => {
    console.log('💢 Process terminated!');
  });
});
