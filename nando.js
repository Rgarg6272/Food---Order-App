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


  return (
    <div>
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
