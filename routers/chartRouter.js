const express = require("express");

const { createChart } = require("../controllers/chartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(auth, createChart);

module.exports = router;
