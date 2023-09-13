import React from "react";
import MaterialTable from "material-table";
import { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { tableData } from "./memberData";

const DynamicTable = () => {
  const [columns, setColumns] = useState([
    { title: "ID", field: "id", align: "center" },
    { title: "Name", field: "name", align: "center" },
    { title: "Age", field: "age", align: "center" },
  ]);

  const [data, setData] = useState(tableData);

  const addColumn = () => {
    const columnName = prompt("Enter column name:");
    if (columnName) {
      setColumns([...columns, { title: columnName, field: columnName }]);
    }
  };

  const addData = () => {
    console.log("Data");
    const newDataEntry = {};
    columns.forEach((column) => {
      const inputValue = prompt(`Enter data for ${column.title}:`);
      if (inputValue) {
        newDataEntry[column.field] = inputValue;
      }
    });
    if (Object.keys(newDataEntry).length > 0) {
      setData([...data, newDataEntry]);
    }
  };
  return (
    <div>
      <div className="buttonHeader">
        <Button variant="outlined" onClick={addColumn}>
          Add Column
        </Button>
        <span style={{ visibility: "hidden" }}>Hey there</span>
        <Button variant="outlined" onClick={addData}>
          Add Data
        </Button>
      </div>

      <div className="tableStyle">
        <MaterialTable
          title="Dynamic Material Table"
          columns={columns}
          data={data}
          options={{
            search: false,
            paging: false,
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
              border: "1px solid black",
            },
            rowStyle: {
              border: "1px solid black",
            },
          }}
        />
      </div>
    </div>
  );
};

export default DynamicTable;
