import React, { useEffect } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import { getUserForms } from "../../../updateAction";
import FormList from "./FormList/FormList";
import DashboardButton from "../../UI/DashboardButton/DashboardButton";
import './Dashboard.scss'

const Dashboard = () => {
  const { state, action } = useStateMachine(getUserForms);
  const formLists = ["Form name", "Last edited", "Notes", "Action"];

  useEffect(() => {
    (async () => {
      // Fetch user's forms
      const res = await axios.get("/api/v1/form/nda");
      console.log("forms", res.data.data.userForms);
      action(res.data.data.userForms);
    })();
  }, []);

  // console.log(state.user.forms[0].createdAt)

  return (
    <div className="dashboard" style={{ marginLeft: "150px" }}>
      <DashboardButton url="/getStarted" name="New Form" />
      <FormList titles={formLists} listItems={state.user.forms}/>
    </div>
  );
};

export default Dashboard;
