import React from "react";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme";
import App from "./components/App";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);
