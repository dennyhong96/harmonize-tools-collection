const express = require("express");

const {
  createChart,
  loadCharts,
  updateChart,
} = require("../controllers/chartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.route("/").get(auth, loadCharts).post(auth, createChart);
router.route("/:id").patch(auth, updateChart);

module.exports = router;
