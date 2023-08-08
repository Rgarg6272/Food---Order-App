import React, { useState } from "react";
import "./App.css";
import MaterialTable, { MTableFilterRow } from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import { DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import {
  useMediaQuery,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import YourForm from "./component/YourForm";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [tableData, setTableData] = useState([
    {
      name: "Raj",
      email: "Raj@gmail.com",
      phone: 7894561230,
      age: 23,
      gender: "M",
      city: "Chennai",
      birthday: "20-04-2001",
      Fee: 22000,
    },
    {
      name: "Mohan",
      email: "mohan@gmail.com",
      phone: 7845621590,
      age: null,
      gender: "M",
      city: "Delhi",
      birthday: "20-04-2001",
      Fee: 20000,
    },
    {
      name: "Sweety",
      email: "sweety@gmail.com",
      phone: 741852912,
      age: 17,
      gender: "F",
      city: "Noida",
      birthday: "20-04-2001",
      Fee: 25000,
    },
    {
      name: "Vikas",
      email: "vikas@gmail.com",
      phone: 9876543210,
      age: 20,
      gender: "M",
      city: "Mumbai",
      birthday: "20-04-2001",
      Fee: 23000,
    },
    {
      name: "Neha",
      email: "neha@gmail.com",
      phone: 7845621301,
      age: 25,
      gender: "F",
      city: "Patna",
      birthday: "20-04-2001",
      Fee: 21900,
    },
    {
      name: "Mohan",
      email: "mohan@gmail.com",
      phone: 7845621590,
      age: 35,
      gender: "M",
      city: "Delhi",
      birthday: "20-04-2001",
      Fee: 22300,
    },
    {
      name: "Sweety",
      email: "sweety@gmail.com",
      phone: 741852912,
      age: 17,
      gender: "F",
      city: "Noida",
      birthday: "20-04-2001",
      Fee: 25000,
    },
  ]);

  const columns = [
    {
      title: "Name",
      field: "name",
      sorting: false,
      align: "center",
    },
    { title: "Email", field: "email", align: "center" },
    { title: "Phone Number", field: "phone", align: "center" },
    {
      title: "Age",
      field: "age",
      emptyValue: () => <em>null</em>,
      defaultSort: "asc",
      align: "center",
      filtering: false,
    },
    {
      title: "Gender",
      field: "gender",
      lookup: { M: "Male", F: "Female" },
      align: "center",
      filtering: false,
    },
    {
      title: "DOB",
      field: "birthday",
      type: "date",
      editComponent: (props) => (
        <MuiPickersUtilsProvider
          utils={DateFnsUtils}
          locale={props.dateTimePickerLocalization}
        >
          <DatePicker
            format="dd/MM/yyyy"
            value={props.value || null}
            onChange={props.onChange}
            clearable
            InputProps={{
              style: {
                fontSize: 13,
              },
            }}
          />
        </MuiPickersUtilsProvider>
      ),
    },
    { title: "City", field: "city", align: "center", filtering: false },
    // {
    //   title: "DOB",
    //   field: "date",
    //   align: "center",
    //   filtering: false,
    // },
    {
      title: "School Fees",
      field: "Fee",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 },
      align: "center",
      filtering: false,
    },
  ];

  const theme = createMuiTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <YourForm />
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <h1 align="center">Material Table</h1>
          <MaterialTable
            columns={columns}
            data={tableData}
            title="Student Information"
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  setTableData([...tableData, newRow]);
                  resolve();
                }),
            }}
            icons={{
              Filter: () => (
                <SearchIcon
                  style={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                  }}
                />
              ),
            }}
            options={{
              sorting: true,
              searchAutoFocus: true,
              searchFieldVariant: "outlined",
              rowStyle: (data, index) =>
                index % 2 === 0
                  ? { backgroundColor: "lightgreen" }
                  : { backgroundColor: "#fff" },
              cellStyle: { border: "1px solid lightgrey" },
              headerStyle: { border: "1px solid lightgrey" },
              tableLayout: isDesktop ? "auto" : "fixed",
              addRowPosition: "first",
              actionsColumnIndex: -1,
              filtering: true,
              padding: "dense",
            }}
          />
        </div>
      </MuiThemeProvider>
    </>
  );
}

export default App;
