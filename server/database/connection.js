const mongoose = require("mongoose");

async function connect(uri) {
  mongoose.set("strictQuery", true);
  const connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
}

module.exports = connect;
