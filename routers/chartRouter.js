const express = require("express");

const { createChart, loadCharts } = require("../controllers/chartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, loadCharts).post(auth, createChart);

module.exports = router;
