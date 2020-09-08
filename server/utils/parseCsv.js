const CSVToJSON = require("csvtojson");
const { v4: uuidv4 } = require("uuid");

/**
 * @function parseCsv
 * @param {filePath} filePath - location of the csv file to be parsed
 * @returns {object} hierarchicalData for org chart visualization
 */
module.exports = async (filePath) => {
  try {
    let source = await CSVToJSON().fromFile(filePath);
    source = source.map((employee) => {
      // Add in id field, required by orgchart library
      return {
        id: `oc-${uuidv4()}`, // html el id must start with letter
        manager: employee.Manager,
        title: employee.Title,
        name: employee.Name,
        email: employee.Email,
      };
    });

    const transformedData = [...source]
      .map((employee) => {
        // Add in manager id field, used to delete a node on cliet side
        if (employee.manager) {
          employee.managerId = source.find(
            (em) =>
              em.name.trim().toLowerCase() ===
              employee.manager.trim().toLowerCase()
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
          (child) =>
            child.manager.trim().toLowerCase() ===
            employee.name.trim().toLowerCase()
        );
        return employee;
      });

    return transformedData.filter(
      // Transform flat data to hierarchical data
      (employee) =>
        !transformedData
          // Get all ids from whom is a child of other
          .map((employee) =>
            employee.children.map((child) => child.name.trim().toLowerCase())
          )
          .reduce((acc, cur) => [...acc, ...cur], [])
          // Filter out those children, only the 'CEO' is left
          .includes(employee.name.trim().toLowerCase())
    )[0];
    console.log(sdlfjsldkfj);
  } catch (error) {
    console.error(error);
    throw { code: "CSV_FORMAT_ERROR" };
  }
};
