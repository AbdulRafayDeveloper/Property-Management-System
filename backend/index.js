require('dotenv').config();
const express = require('express');
const cors = require('cors');
const user = require('./src/routes/user/user')
const session = require('express-session');
const { hosmintinaSocket } = require('./src/utils/socket');
const http = require("http");
const app = express();
const logger = require('./src/utils/logger')
const mongoose = require("mongoose");

app.use(session({
  secret: 'Hosmuntina-App',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = ['*', "http://localhost:52455/"]; 
var corsOptions = {
    origin: '*',
};

app.use(cors(corsOptions));

const serverSocket = http.createServer(app);
hosmintinaSocket(serverSocket)

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DBNAME,
  })
  .then(() => {
    logger.info("Connected to the database")
  })
  .catch((error) => {
    logger.info( `Connected to the database ${error.message}`)
  });



app.use("/api", user);
app.use("/api", require('./src/routes/listings/listing'));
app.use("/api", require('./src/routes/listings/savedListings'));
app.use("/api", require('./src/routes/application/application'));
app.use("/api", require('./src/routes/application/renterApplication'));
app.use("/api", require('./src/routes/application/landlordApplication'));
app.use("/api", require('./src/routes/chat/message'));
app.use("/api", require('./src/routes/chat/room'));
app.use("/api", require('./src/routes/maintenance/maintenance'));
app.use("/api", require('./src/routes/viewing/viewing'));
app.use("/api", require('./src/routes/tasks/tasks'));
app.use("/api", require('./src/routes/notifications/notification'));


const port = process.env.PORT || 3000;

const server=serverSocket.listen(port, () => {
  logger.info(`Server is running on port ${port}`)
});

module.exports = { app, server };