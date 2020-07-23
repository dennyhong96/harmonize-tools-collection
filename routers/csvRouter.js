const express = require("express");

const { getCsvTemplate } = require("../controllers/csvController");

const router = express.Router();
router.route("/").get(getCsvTemplate);

module.exports = router;
