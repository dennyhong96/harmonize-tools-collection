import React from "react";
import { useHistory } from "react-router-dom";

export default function DashboardButton(props) {
  const { push } = useHistory();

  const onClick = () => {
    push(props.url);
  };

  return (
    <div>
      <button style={{ marginLeft: "850px", marginBottom: '20px', width: '150px' }} className="Button" onClick={onClick}>
        {props.name}
      </button>
    </div>
  );
}