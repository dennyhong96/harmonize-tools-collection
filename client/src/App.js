import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import Landing from "./Components/pages/Landing";
import Home from "./Components/pages/Home";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/app" component={Home} />
      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
