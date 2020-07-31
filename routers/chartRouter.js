const express = require("express");

const { createChart, loadChart } = require("../controllers/chartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, loadChart).post(auth, createChart);

module.exports = router;
