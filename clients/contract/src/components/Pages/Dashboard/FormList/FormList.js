import React from "react";
import { Table } from "react-bootstrap";
import FormListItem from "../FormListItem/FormListItem";

export default function FormList(props) {
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
        <FormListItem listItem={props.listItems} />
      </tbody>
    </Table>
  );
}
