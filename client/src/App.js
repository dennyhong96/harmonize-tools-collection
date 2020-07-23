import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./Components/pages/Home";
import "./App.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
