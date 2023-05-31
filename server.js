// require the necessary packages
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// set up port and app
const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

// set up middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// once db connection is open, start server listening
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for Spotimy running on port ${PORT}!`);
  });
});