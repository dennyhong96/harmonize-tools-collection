import React from "react";
import "./GetStarted.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "../../../updateAction";

import GetStartedImg from "../../Assets/getstarted.png";

export default function GetStarted() {
  const { state, action } = useStateMachine(updateAction);
  const { register, handleSubmit } = useForm({
    defaultValues: state.formDetails,
  });

  const history = useHistory();

  const onNextStep = (data) => {
    action(data);
    history.push("/general");
  };

  return (
    <>
      <form className="get-started__form" onSubmit={handleSubmit(onNextStep)}>
        <div>
          <div>
            <span className="get-started__question">I am a </span>
            <input
              name="iAm"
              ref={register({ required: true })}
              className="get-started__input"
              placeholder="Human Resources Manager"
              type="text"
            ></input>
          </div>

          <div>
            <span className="get-started__question">Looking to create a </span>
            <select
              className="get-started__input"
              defaultValue="Non-Disclosure Agreement"
            >
              <option value="Non-Disclosure Agreement">
                Non-Disclosure Agreement
              </option>
              <option disabled value="Option2">
                Medical Non-Disclosure Agreement(coming soon)
              </option>
            </select>
          </div>

          <button className="get-started__btn" type="submit">
            Create
          </button>
        </div>
      </form>
      <img src={GetStartedImg} className="get-started__img" alt="Get Started" />
    </>
  );
}
