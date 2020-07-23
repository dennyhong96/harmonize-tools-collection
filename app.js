const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const csvRouter = require("./routers/csvRouter");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(fileUpload());

// Mount Routers
app.use("/api/v1/csv", csvRouter);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server up on port ${port}...`));
