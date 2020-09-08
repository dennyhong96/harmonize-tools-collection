const Chart = require("../model/Chart");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

exports.createChart = asyncHandler(async (req, res, next) => {
  const { chartData } = req.body;
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

exports.loadCharts = asyncHandler(async (req, res, next) => {
  const charts = await Chart.find({ userId: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    status: "success",
    data: { charts },
  });
});

exports.updateChart = asyncHandler(async (req, res, next) => {
  let chart = await Chart.findById(req.params.id);

  if (!chart) {
    return next(new AppError("Chart not found.", 404));
  }

  if (chart.userId.toString() !== req.user._id.toString()) {
    return next(new AppError("User not authorized", 401));
  }

  let { chartData } = req.body;
  if (!chartData) {
    return next(new AppError("Missing chart data", 400));
  }

  chartData = JSON.stringify(chartData);
  chart = await Chart.findByIdAndUpdate(
    req.params.id,
    { chartData },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    data: { chart },
  });
});
