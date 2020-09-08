import React from "react";
import "./MainPage.css"
import MainHeader from "./MainHeader/MainHeader";
import MainIntro from "./MainIntro/MainIntro";
import MainFeature from "./MainFeature/MainFeature";
import MainComingsoon from "./MainComingsoon/MainComingsoon";
import MainFeedback from "./MainFeedback/MainFeedback";
import MainCTA from "./MainCTA/MainCTA";

export default function MainPage() {
  return (
    <div className="main-page">
        <MainHeader />
        <MainIntro />
        <MainFeature />
        <MainComingsoon />
        <MainFeedback />
        <MainCTA />
    </div>
  );
}
