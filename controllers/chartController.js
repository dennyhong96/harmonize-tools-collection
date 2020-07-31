const Chart = require("../model/Chart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createChart = asyncHandler(async (req, res, next) => {
  const chartData = req.body;
  if (!chartData) {
    return next(new AppError("Chart data is required.", 400));
  }
  const data = {
    ...req.body,
    chartData: JSON.stringify(chartData),
    userId: req.user.id,
  };
  const chart = await Chart.create(data);
  res.status(201).json({
    status: "success",
    data: { chart },
  });
});

exports.loadChart = asyncHandler(async (req, res, next) => {
  const chart = await Chart.findOne({ userId: req.user.id });
  res.status(200).json({
    status: "success",
    data: { chart },
  });
});
