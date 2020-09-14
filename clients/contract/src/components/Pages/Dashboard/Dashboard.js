import React, { useEffect } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import { getUserForms } from "../../../updateAction";
import FormList from "./FormList/FormList";
import DashboardButton from "../../UI/DashboardButton/DashboardButton";
import ActionButton from "../../UI/ActionButton/ActionButton";
import './Dashboard.scss'

const Dashboard = () => {
  const { state, action } = useStateMachine(getUserForms);

  useEffect(() => {
    (async () => {
      // Fetch user's forms
      const res = await axios.get("/api/v1/form/nda");
      console.log("forms!!!!", res.data.data.userForms);
      action(res.data.data.userForms);
    })();
  }, []);


  // Test 
  const formLists = ["Form name", "Last edited", "Notes", "Action"];
  const actionList = ["send", "edit", "delete"];
  const test = [
    "Non-disclosure Agreement - Intern",
    "Aug14, 2020",
    "Edited to include intern require..",
    <ActionButton list={actionList} />,
  ];

  return (
    <div className="dashboard" style={{ marginLeft: "150px" }}>
      <DashboardButton url="/" name="New Form" />
      <FormList titles={formLists} listItems={test} />
    </div>
  );
};

export default Dashboard;
