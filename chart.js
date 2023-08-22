import React, { useState } from "react";
import "./App.css";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import DelegatedDialog from "./component/DelegatedDialog";

function App() {
  const [tableData, setTableData] = useState([
    {
      subscriberid: 87687676980,
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
      subscriberid: 87687676980,
      jivamemberid: 98777,
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
      subscriberid: 87687676982,
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
      subscriberid: 87687676983,
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
      align: "center",
    },
    {
      title: "Jiva Member ID",
      field: "jivamemberid",
      filterPlaceholder: "filter",
      align: "center",
    },
    {
      title: "Member First Name",
      field: "memberfirstname",
      align: "center",
      align: "center",
    },
    {
      title: "Member Last Name",
      field: "memberlastname",
      align: "center",
    },
    {
      title: "Delegate",
      field: "delegate",
      align: "center",
    },
    {
      title: "Contact Type",
      field: "contacttype",
      filterPlaceholder: "filter",
      align: "center",
    },
    {
      title: "Contact Name",
      field: "contactname",
      headerStyle: { color: "#fff" },
      align: "center",
    },
    {
      title: "Cell Phone",
      field: "cellphone",
      filterPlaceholder: "filter",
      align: "center",
    },
    {
      title: "Work Phone",
      field: "workphone",
      filterPlaceholder: "filter",
      align: "center",
    },
    {
      title: "Email",
      field: "email",
      filterPlaceholder: "filter",
      align: "center",
    },
    {
      title: "Preferred",
      field: "preferred",
      filterPlaceholder: "filter",
      align: "center",
    },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  return (
    <div className="App">
      <MaterialTable
        columns={columns}
        data={tableData}
        actions={[
          {
            icon: () => (
              <>
                <Button onClick={handleDialog}>Replace</Button>
                <PersonAddDisabledIcon />
              </>
            ),
            onClick: (e, data) => console.log(data),
          },
        ]}
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
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 0 ? { background: "#f5f5f5" } : null,
          headerStyle: { background: "#f44336", color: "#fff" },
        }}
        title="Table"
      />
      {dialogOpen && <DelegatedDialog handleCloseDialog={handleCloseDialog} />}
    </div>
  );
}

export default App;
