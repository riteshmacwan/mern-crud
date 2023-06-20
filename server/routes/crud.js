const router = require("express").Router();
const crudController = require("../controllers/crud.js");
const fileUpload = require("../utils/fileUpload.js");

router.get("/index", crudController.index);

router.post("/create", fileUpload.single("file"), crudController.create);

router.get("/show", crudController.show);

router.get("/search", crudController.search);

router.delete("/delete", crudController.deleteRecord);

router.post("/update", fileUpload.single("file"), crudController.update);

module.exports = router;
