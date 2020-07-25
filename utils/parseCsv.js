const CSVToJSON = require("csvtojson");

/**
 * @function parseCsv
 * @param {filePath} filePath - location of the csv file to be parsed
 * @returns {object} hierarchicalData for org chart visualization
 */
module.exports = async (filePath) => {
  let id = 0;

  const source = await CSVToJSON().fromFile(filePath);
  const transformedData = source
    .map((employee) => {
      // Add in 'children' field which is required by OrgChart
      employee.children = source.filter(
        (child) => child.manager === employee.name
      );
      return employee;
    })
    .map((employee) => {
      // Get rid of 'manager' field
      employee.id = `n${id}`;
      id++;
      return employee;
    });

  return transformedData.filter(
    // Transform flat data to hierarchical data
    (employee) =>
      !transformedData
        // Get all ids from whom is a child of other
        .map((employee) => employee.children.map((child) => child.name))
        .reduce((acc, cur) => [...acc, ...cur], [])
        // Filter out those children, only the 'CEO' is left
        .includes(employee.name)
  )[0];
};
