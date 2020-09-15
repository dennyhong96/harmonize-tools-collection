import React, { useEffect } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import { getUserForms } from "../../../updateAction";

import styles from "./Dashboard.module.scss";

import Card from "./Card/Card";
import Aside from "./Aside/Aside";

const Dashboard = () => {
  const { state, action } = useStateMachine(getUserForms);

  useEffect(() => {
    (async () => {
      // Fetch user's forms
      const res = await axios.get("/api/v1/form/nda");
      console.log("forms", res.data.data.userForms);
      action(res.data.data.userForms);
    })();
  }, []);

  return (
    <div className={styles["dashboard"]}>
      <Card />
      <Aside />
    </div>
  );
};

export default Dashboard;
