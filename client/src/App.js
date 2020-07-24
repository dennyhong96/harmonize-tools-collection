import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Home from "./home/home";
import EditChart from "./edit-chart/edit-chart";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <nav>
          <NavLink to="/" exact activeClassName="selected">Home</NavLink>
          <NavLink to="/edit-chart" activeClassName="selected">Edit Chart</NavLink>
        </nav>

        <Route exact path="/" component={Home} />       
        <Route path="/edit-chart" component={EditChart} />
      </div>
    </Router>
  );
};

export default App;
