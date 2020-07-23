const express = require("express");
const CSVToJSON = require("csvtojson");

const app = express();

const parseCSV = async () => {
  try {
    const source = await CSVToJSON().fromFile("./example.csv");

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

    console.log(JSON.stringify(hierarchicalData));
  } catch (error) {
    console.error(error);
  }
};
parseCSV();

// console.log(
//   JSON.stringify({
//     id: "n1",
//     name: "Lao Lao",
//     title: "general manager",
//     children: [
//       { id: "n2", name: "Bo Miao", title: "department manager" },
//       {
//         id: "n3",
//         name: "Su Miao",
//         title: "department manager",
//         children: [
//           { id: "n4", name: "Tie Hua", title: "senior engineer" },
//           {
//             id: "n5",
//             name: "Hei Hei",
//             title: "senior engineer",
//             children: [
//               { id: "n6", name: "Dan Dan", title: "engineer" },
//               { id: "n7", name: "Xiang Xiang", title: "engineer" },
//             ],
//           },
//           { id: "n8", name: "Pang Pang", title: "senior engineer" },
//         ],
//       },
//       { id: "n9", name: "Hong Miao", title: "department manager" },
//       {
//         id: "n10",
//         name: "Chun Miao",
//         title: "department manager",
//         children: [{ id: "n11", name: "Yue Yue", title: "senior engineer" }],
//       },
//     ],
//   })
// );

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
