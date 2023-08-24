import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import DelegatedDialog from "./component/DelegatedDialog";

function App() {
  const [tableData, setTableData] = useState([
    {
      subscriberid: 1,
      jivamemberid: 98777,
      memberfirstname: "Smith",
      memberlastname: "John",
      delegate: "PMS",
      contacttype: "Care Team",
      contactname: "Smith, John",
      cellphone: 179458399,
      workphone: 788437943,
      email: "test1@gmail.com",
      preferred: "Cell Phone",
    },
    {
      subscriberid: 2,
      jivamemberid: 98778,
      memberfirstname: "Tessa",
      memberlastname: "Adam",
      delegate: "Health Home",
      contacttype: "Care Link",
      contactname: "Tessa, Adam",
      cellphone: 3645345453,
      workphone: 4564564566,
      email: "test2@gmail.com",
      preferred: "Work Phone",
    },
    {
      subscriberid: 3,
      jivamemberid: 98779,
      memberfirstname: "Levi",
      memberlastname: "Mark",
      delegate: "PMG",
      contacttype: "Not Found",
      contactname: "Levi, Mark",
      cellphone: "Not Found",
      workphone: "Not Found",
      email: "Not Found",
      preferred: "Not Found",
    },
    {
      subscriberid: 4,
      jivamemberid: 98780,
      memberfirstname: "Chris",
      memberlastname: "Alister",
      delegate: "PMS",
      contacttype: "Unassigned",
      contactname: "Unassigned",
      cellphone: "-",
      workphone: "-",
      email: "-",
      preferred: "-",
    },
  ]);
  const columns = [
    {
      title: "Subscriber ID",
      field: "subscriberid",
      sorting: false,
      filtering: false,
      headerStyle: { color: "#fff" },
    },
    {
      title: "Jiva Member ID",
      field: "jivamemberid",
      filterPlaceholder: "filter",
    },
    {
      title: "Member First Name",
      field: "memberfirstname",
    },
    {
      title: "Member Last Name",
      field: "memberlastname",
    },
    {
      title: "Delegate",
      field: "delegate",
    },
    {
      title: "Contact Type",
      field: "contacttype",
      filterPlaceholder: "filter",
    },
    {
      title: "Contact Name",
      field: "contactname",
      headerStyle: { color: "#fff" },
    },
    {
      title: "Cell Phone",
      field: "cellphone",
      filterPlaceholder: "filter",
    },
    {
      title: "Work Phone",
      field: "workphone",
      filterPlaceholder: "filter",
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "filter",
    },
    {
      title: "Preferred",
      field: "preferred",
      filterPlaceholder: "filter",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleDialog = (rowData) => {
    console.log("selected row initially:", rowData);
    setSelectedRow(rowData);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleReplaceClick = (selectedRowData) => {
    console.log("selected row: ", selectedRowData.subscriberid);

    const rowIndex = tableData.findIndex(
      (row) => row.subscriberid === selectedRowData.subscriberid
    );
    console.log(rowIndex);
    if (rowIndex !== -1) {
      const updatedTableData = [...tableData];
      updatedTableData[rowIndex] = selectedRowData;

      setTableData(updatedTableData);
    }
    console.log("updated table data: ", tableData);
  };
  return (
    <div className="App">
      <Grid container>
        <Grid item xs={12}>
          <Button>Assign Contact</Button>
        </Grid>
      </Grid>
      <MaterialTable
        columns={columns}
        data={tableData}
        actions={[
          {
            icon: () => (
              <>
                <Button onClick={() => handleDialog(selectedRow)}>
                  Replace
                </Button>
                <PersonAddDisabledIcon />
              </>
            ),
            onClick: (event, rowData) => {
              setSelectedRow(rowData);
              console.log("selected row data", rowData);
            },
          },
        ]}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),
        }}
        options={{
          sorting: true,
          search: false,
          searchFieldAlignment: "right",
          searchAutoFocus: true,
          searchFieldVariant: "standard",
          paging: true,
          pageSize: 5,
          paginationType: "stepped",
          showFirstLastPageButtons: false,
          addRowPosition: "first",
          actionsColumnIndex: -1,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336", color: "#fff" },
        }}
        title="Table"
        icons={{
          Add: () => (
            <Button
              variant="contained"
              color="secondary"
              style={{
                borderRadius: 0,
                textTransform: "capitalize",
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleDialog({});
              }}
            >
              Assign Contact
            </Button>
          ),
        }}
      />
      {dialogOpen && (
        <DelegatedDialog
          handleCloseDialog={handleCloseDialog}
          handleReplaceClick={handleReplaceClick}
          dialogSelectedRow={selectedRow}
        />
      )}
    </div>
  );
}

export default App;
