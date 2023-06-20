const crudModel = require("../models/crud.js");
const fs = require("fs");
const path = require("path");
const transporter = require("../utils/sendEmail.js");
const mailData = require("../helpers/mailFormat.js");

//Insert record into database
function create(req, res) {
  const { name, email, address, country, b_date, language, gender } = req.body;
  const languageData = language ? language.split(",") : [];

  const file = req.file ? req.file.filename : null;

  const data = new crudModel({
    name: name ? name : "",
    email: email,
    address: address,
    country: country,
    b_date: b_date,
    file: file,
    language: languageData,
    gender: gender,
  });

  data
    .save()
    .then((result) => {
      const mailFormat = mailData(req.body);
      // Create a mail options object
      const mailOptions = {
        from: "ritesh@groovyweb.co",
        to: email,
        subject: "Test Email",
        html: mailFormat,
      };

      // Send the email
      if (email) {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }

      res.status(201).json({ msg: "Data inserted!" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "Something went wrong!", err: err });
    });
}

//Get all records from database
function index(req, res) {
  //   crudModel.find({ name: "test2" }).then((data) => {
  crudModel
    .find()
    .then((data) => {
      res.status(201).json({ data: data });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong!" });
    });
}

//Delete specific record from database
function deleteRecord(req, res) {
  const { id } = req.body;
  console.log("delete id:", id);
  crudModel
    .findOneAndDelete({ _id: id })
    .then((data) => {
      if (data.file) {
        deleteFile(data.file);
      }
      res.status(201).json({ msg: "Record is deleted!" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong!" });
    });
}

function deleteFile(fileName) {
  console.log(path.dirname("images") + "/" + fileName);
  fs.unlink("images/" + fileName, (err) => {
    console.log(`Error occurred while deleting file ${fileName}`);
    console.log(`Error is ${err}`);
  });
}

//Update specific record from database
function update(req, res) {
  const { _id, name, email, address, country, b_date, language, gender } =
    req.body;
  const languageData = language ? language.split(",") : [];

  const file = req.file ? req.file.filename : null;
  if (file) {
    crudModel.findById(_id).then((data) => {
      const oldFile = data.file;
      deleteFile(oldFile);
    });
  }
  const updateData = {
    name: name,
    email: email,
    address: address,
    country: country,
    b_date: b_date,
    language: languageData,
    gender: gender ? gender : "",
  };
  if (file !== null) {
    updateData["file"] = file;
  }

  crudModel
    .findOneAndUpdate({ _id: _id }, updateData, { new: true })
    .then((data) => {
      res.status(201).json({ msg: "Record is updated!", data: data });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong!" });
    });
}

//Get one specific record from database
function show(req, res) {
  const { _id } = req.body;
  crudModel
    .findOne({ _id: _id })
    .then((data) => {
      res.status(201).json({ data: data });
    })
    .catch((err) => {
      res.status(500).json({ msg: "Something went wrong!" });
    });
}

//Get searched records from database
function search(req, res) {
  console.log(req.query);
  const { q } = req.query;
  if (q) {
    crudModel
      .find({ $or: [{ name: q }, { email: q }] })
      .then((data) => {
        res.status(201).json({ data: data });
      })
      .catch((err) => {
        res.status(500).json({ msg: "Something went wrong!" });
      });
  } else {
    res.status(500).json({ msg: "Something went wrong!" });
  }
}

module.exports = { create, index, deleteRecord, update, show, search };
