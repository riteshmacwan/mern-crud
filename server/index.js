require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getDate = require("./custom_modules/today.js");
const crudRoutes = require("./routes/crud.js");
const connection = require("./database/connection.js");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());

app.use("/images", express.static("images"));

app.get("/check", function (req, res) {
  res.send("app is working");
});

app.get("/date", function (req, res) {
  res.send("Today is: " + getDate());
});

app.use("/", crudRoutes);

const PORT = process.env.PORT || 8080;
connection(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongo connection successful!");
    app.listen(PORT, () => {
      console.log(`server is running on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection was not set...", error);
  });
