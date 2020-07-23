const CSVToJSON = require("csvtojson");
const path = require("path");

exports.getCsvTemplate = (req, res, next) => {
  res.download("./csv/template.csv");
};

exports.uploadCsvTemplate = async (req, res, next) => {
  try {
    const filePath = path.join(__dirname, "../csv/customer.csv");
    req.files.csv.mv(filePath);

    const source = await CSVToJSON().fromFile(filePath);

    const transformedData = source
      .map((employee) => {
        // Add in 'children' field which is required by OrgChart
        employee.children = source.filter(
          (child) => child.report_to === employee.id
        );
        return employee;
      })
      .map((employee) => {
        // Get rid of 'report_to' field
        delete employee.report_to;
        return employee;
      });

    const hierarchicalData = transformedData.filter(
      // Transform flat data to hierarchical data
      (employee) =>
        !transformedData
          // Get all ids from whom is a child of other
          .map((employee) => employee.children.map((child) => child.id))
          .reduce((acc, cur) => [...acc, ...cur], [])
          // Filter out those children, only the 'CEO' is left
          .includes(employee.id)
    )[0];

    res.status(200).json({ data: hierarchicalData });
  } catch (error) {
    console.error(error);
  }
};
