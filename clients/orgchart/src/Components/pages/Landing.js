import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";

import Header from "../landing/Header";
import Showcase from "../landing/Showcase";
import Features from "../landing/Features";
import Footer from "../landing/Footer";
import Navbar from "../landing/Navbar";
import Drawer from "../landing/Drawer";
import "./Landing.scss";

const Landing = ({ history }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    ReactGA.initialize("UA-175053486-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <section className="landing">
      <Navbar onDrawerOpen={() => setDrawerOpen(true)} />
      <Drawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
      />
      <Header />

      <Showcase history={history} />
      <Features />
      <Footer />
    </section>
  );
};

export default Landing;
