const CSVToJSON = require("csvtojson");
const { v4: uuidv4 } = require("uuid");

/**
 * @function parseCsv
 * @param {filePath} filePath - location of the csv file to be parsed
 * @returns {object} hierarchicalData for org chart visualization
 */
module.exports = async (filePath) => {
  const source = await CSVToJSON().fromFile(filePath);
  const transformedData = source
    .map((employee) => {
      // Add in id field, required by orgchart library
      employee.id = `oc-${uuidv4()}`; // html el id must start with letter
      return employee;
    })
    .map((employee) => {
      // Add in id field, used to delete a node on cliet side
      if (employee.manager) {
        employee.managerId = source.find(
          (em) => em.name === employee.manager
        ).id;
      } else {
        // Root node gets empty string for managerId
        employee.managerId = "";
      }
      return employee;
    })
    .map((employee) => {
      // Add in 'children' field, required by orgchart library
      employee.children = source.filter(
        (child) => child.manager === employee.name
      );
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

/*
module.exports = async (filePath) => {
  const source = await CSVToJSON().fromFile(filePath);
  const transformedData = source.map((employee) => {
    employee.id = `oc-${uuidv4()}`; // html el id must start with letter
    // Add in 'children' field which is required by OrgChart
    employee.children = source.filter(
      (child) => child.manager === employee.name
    );
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
*/
