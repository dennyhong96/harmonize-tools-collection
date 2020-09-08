import React, { useState, useEffect, Fragment } from "react";
import ReactGA from "react-ga";

import Navbar from "../Home/Navbar";
import Header from "../Home/Header";
import Drawer from "../Home/Drawer";
import Tools from "../Home/Tools";
import Footer from "../Home/Footer";

const Home = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    ReactGA.initialize("UA-175053486-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Fragment>
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Header />
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
      <Tools />
      <Footer />
    </Fragment>
  );
};

export default Home;
