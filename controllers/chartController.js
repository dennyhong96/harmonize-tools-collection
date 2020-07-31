const Chart = require("../model/Chart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createChart = asyncHandler(async (req, res, next) => {
  const data = { ...req.body, userId: req.user.id };
  const chart = await Chart.create(data);
  res.status(201).json({
    status: "success",
    data: { chart },
  });
});
