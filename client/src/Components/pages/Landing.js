import React from "react";

import Header from "../landing/Header";
import Showcase from "../landing/Showcase";
import Features from "../landing/Features";
import Footer from "../landing/Footer";
import Navbar from "../layout/Navbar";
import "./Landing.scss";

const Landing = () => {
  return (
    <section className="landing">
      <Navbar />
      <Header />
      <Showcase />
      <Features />
      <Footer />
    </section>
  );
};

export default Landing;
