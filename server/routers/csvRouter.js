const express = require("express");

const {
  getCsvTemplate,
  uploadCsvTemplate,
} = require("../controllers/csvController");

const router = express.Router();
router.route("/").get(getCsvTemplate).post(uploadCsvTemplate);

module.exports = router;
