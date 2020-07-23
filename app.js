const express = require("express");
const morgan = require("morgan");
const CSVToJSON = require("csvtojson");

const csvRouter = require("./routers/csvRouter");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Mount Routers
app.use("/api/v1/csv", csvRouter);

// const parseCSV = async () => {
//   try {
//     const source = await CSVToJSON().fromFile("./example.csv");

//     const transformedData = source
//       .map((employee) => {
//         // Add in 'children' field which is required by OrgChart
//         employee.children = source.filter(
//           (child) => child.report_to === employee.id
//         );
//         return employee;
//       })
//       .map((employee) => {
//         // Get rid of 'report_to' field
//         delete employee.report_to;
//         return employee;
//       });

//     const hierarchicalData = transformedData.filter(
//       // Transform flat data to hierarchical data
//       (employee) =>
//         !transformedData
//           // Get all ids from whom is a child of other
//           .map((employee) => employee.children.map((child) => child.id))
//           .reduce((acc, cur) => [...acc, ...cur], [])
//           // Filter out those children, only the 'CEO' is left
//           .includes(employee.id)
//     )[0];
//   } catch (error) {
//     console.error(error);
//   }
// };
// parseCSV();

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
