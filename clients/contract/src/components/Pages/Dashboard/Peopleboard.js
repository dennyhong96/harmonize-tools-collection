import React, { useEffect } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import { getUserForms } from "../../../updateAction";
import FormList from "./FormList/FormList";
import DashboardButton from "../../UI/DashboardButton/DashboardButton";
import ActionButton from "../../UI/ActionButton/ActionButton";
import './Dashboard.scss'

export default function Peopleboard() {
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
  const formLists = ["Name", "Position", "Start Date", "Form Status", "Action"];
  const actionList = ["Send from", "Remind"];
  const test = [
    "Isabelle Intern",
    "UX Design Intern",
    "June, 20, 2020",
    "Received",
    <ActionButton list={actionList} />,
  ];

  return (
    <div className="dashboard" style={{ marginLeft: "150px" }}>
      <DashboardButton url="/" name="Add Employee" />
      <FormList titles={formLists} listItems={test} />
    </div>
  );
}
