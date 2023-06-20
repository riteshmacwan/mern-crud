const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  b_date: {
    type: String,
  },
  file: {
    type: String,
  },
  language: {
    type: [String],
  },
  gender: {
    type: String,
  },
});

module.exports = mongoose.model("crud", crudSchema);
