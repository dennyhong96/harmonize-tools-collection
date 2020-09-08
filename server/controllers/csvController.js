const path = require("path");
const parseCsv = require("../utils/parseCsv");

// @desc    Send csv template to client
// @route   GET /api/v1/csv
// @access  Public
exports.getCsvTemplate = (req, res, next) => {
  // Send back template csv
  // res.status(200).download("./csv/template.csv");
  res.status(200).download(path.join(__dirname, "../csv", "empty.csv"));
};

// @desc    Upload modified csv
// @route   POST /api/v1/csv
// @access  Public
exports.uploadCsvTemplate = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "../csv/customer.csv");

    // Move csv file to server
    req.files.csv.mv(filePath);

    // Parse hierarchical data from flat csv
    const hierarchicalData = await parseCsv(filePath);
    if (!hierarchicalData) {
      throw { code: "CSV_FORMAT_ERROR" };
    }
    res.status(200).json({ status: "success", data: { hierarchicalData } });
  } catch (error) {
    console.error(error);
    if (error.code === "CSV_FORMAT_ERROR") {
      res.status(400).json({
        status: "failed",
        message: "Please make sure your CSV file is valid.",
      });
    }
  }
};
