import React from "react";

export default function FormListItem(props) {
  return (
    <tr  className="formlist-item" >
      {props.listItem.map((list, i) => (
        <td key={i}>{list}</td>
      ))}
    </tr>
  );
}
