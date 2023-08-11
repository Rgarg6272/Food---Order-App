import React, { useState } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  useMediaQuery,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import DelegatedDialog from "./component/DelegatedDialog";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "90%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px 30px 30px",
    display: "flex",
    flexDirection: "column",
  },

  closeButton: {
    position: "absolute",
    cursor: "pointer",
    color: "#A71930",
  },

  btn: {
    "&:hover": {
      background: "#14837B",
    },
    position: "relative",
    left: "82%",
    top: "15px",
    backgroundColor: "#14837B",
    textTransform: "capitalize",
    color: "white",
    borderRadius: 0,
    minWidth: "80px",
  },
}));

const App = () => {
  const [tableData, setTableData] = useState([
    {
      city: "Chennai",
      birthday: "20-04-2001",
      Fee: 22000,
      bio: "Bio-data",
    },
  ]);

  const columns = [
    {
      title: "City",
      field: "city",
      align: "center",
      filtering: false,
      render: (rowData) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a style={{ cursor: "pointer" }} onClick={handleDialog}>
            <span
              style={{
                marginRight: "5px",
                position: "relative",
                bottom: "6px",
                textDecoration: "underline",
              }}
            >
              View Details
            </span>
            <ExitToAppIcon style={{ cursor: "pointer" }} />
          </a>
        </div>
      ),
    },

    {
      title: "School Fees",
      field: "Fee",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 0 },
      align: "center",
      filtering: false,
      render: (rowData) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a style={{ cursor: "pointer" }} onClick={handleDialog}>
            <span
              style={{
                marginRight: "5px",
                position: "relative",
                bottom: "6px",
                textDecoration: "underline",
              }}
            >
              View Details
            </span>
            <ExitToAppIcon style={{ cursor: "pointer" }} />
          </a>
        </div>
      ),
    },
    {
      title: "Bio-Data",
      field: "bio",
      align: "center",
      filtering: false,
      render: (rowData) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a style={{ cursor: "pointer" }} onClick={handleDialog}>
            <span
              style={{
                marginRight: "5px",
                position: "relative",
                bottom: "6px",
                textDecoration: "underline",
              }}
            >
              View Details
            </span>
            <ExitToAppIcon style={{ cursor: "pointer" }} />
          </a>
        </div>
      ),
    },
  ];

  const theme = createMuiTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
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
          {dialogOpen && (
            <DelegatedDialog handleCloseDialog={handleCloseDialog} />
          )}
        </div>
      </MuiThemeProvider>
    </>
  );
};

export default App;
