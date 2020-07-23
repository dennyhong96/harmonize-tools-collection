import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import OrgChart from "../OrgChart";

const Home = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={OrgChart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Home;
