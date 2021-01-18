import React from "react";
import { TableComponent } from "../Table/Table";
import "./Body.css";
import { Button } from "../Button/Button";

export function Body({ data, addItem, header, removeItem, changeValue }) {
  return (
    <div className="body">
      <div className="header">
        <Button onClick={addItem} title="Add Item" />
      </div>
      <div className="tableContainer">
        <TableComponent
          data={data}
          addItem={addItem}
          header={header}
          removeItem={removeItem}
          changeValue={changeValue}
        />
      </div>
    </div>
  );
}
