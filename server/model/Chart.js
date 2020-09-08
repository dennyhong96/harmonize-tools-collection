const mongoose = require("mongoose");

const chartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A user id is required."],
  },
  chartData: {
    type: String,
    required: [true, "Chart cannot be empty."],
  },
  chartName: {
    type: String,
    required: [true, "A chart name is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Chart", chartSchema);
