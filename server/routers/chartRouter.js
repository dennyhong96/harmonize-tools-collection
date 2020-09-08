const express = require("express");

const {
  createChart,
  loadCharts,
  updateChart,
} = require("../controllers/chartController");
const auth = require("../middlewares/auth");
const jwtAuth = require("../middlewares/jwtAuth");

const router = express.Router();

router
  .route("/")
  .get(jwtAuth, auth, loadCharts)
  .post(jwtAuth, auth, createChart);
router.route("/:id").patch(jwtAuth, auth, updateChart);

module.exports = router;
