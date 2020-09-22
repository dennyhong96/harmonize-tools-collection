import React from "react";
import { Table } from "react-bootstrap";
import FormListItem from "../FormListItem/FormListItem";
import ActionButton from "../../../UI/ActionButton/ActionButton";

export default function FormList(props) {
  const actionList = ["send", "edit", "delete"];

  return (
    <Table style={{ width: "1000px" }}>
      <thead>
        <tr>
          {props.titles.map((title, i) => (
            <th key={i}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.listItems.map((form, i) => (
          <FormListItem
            listItem={[
              form.name,
              form.createdAt,
              form.note,
              <ActionButton list={actionList} />,
            ]}
          />
        ))}
      </tbody>
    </Table>
  );
}
