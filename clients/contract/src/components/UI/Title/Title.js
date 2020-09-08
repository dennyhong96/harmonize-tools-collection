import React from "react";
import "./Title.css";
import Tooltip from "../Tooltip/Tooltip";

export default function Title() {
  const titleTip = (
    <span style={{ color: "black", fontSize: "14px" }}>
      <b>How is the form created?</b> <br />
      Your response to each question determines what goes into your customized
      contract. Make sure to fill out all fields so we can help you put
      everything together! <br /> <br /> You can find out the additional
      information throughout by hovering over <b>"i"</b> icon. 
    </span>
  );
  return (
    <div className="title-container">
      <h1 className="title-h1">
        Non-Disclosure Agreement
        <Tooltip placement="bottomRight" tips={titleTip} />
      </h1>
      <a
        className="title-link"
        href="https://www.harmonizehq.com"
        rel="noopener noreferrer"
        target="_blank"
      >Change Templete
    </a>
    </div>
  );
}
