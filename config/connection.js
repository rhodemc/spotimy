// require mongoose
const { connect, connection } = require('mongoose');

// connect to MongoDB
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spotimyDB';

connect(connectionString);

module.exports = connection;