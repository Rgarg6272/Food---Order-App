import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { Button, Paper } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
  customToolbar: {
    "& .MTableToolbar-root-5": {
      minHeight: "0px !important",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    color: "#A71930",
    right: "25px",
  },

  typoHeaderContainer: {
    padding: "1rem 1rem 1rem 0rem",
  },
  typoHeader: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#000000",
  },
}));

const DelegatedDialog = ({
  handleCloseDialog,
  handleReplaceClick,
  dialogSelectedRow,
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleCloseDialog();
  };

  const handleReplace = () => {
    // console.log("hello");
    console.log("Dialog selected row: ", dialogSelectedRow);
    if (dialogSelectedRow) {
      handleReplaceClick(dialogSelectedRow);
      handleClose();
    }
  };

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowSelection = (rowData) => {
    console.log("selected row data", rowData);
    setSelectedRow(selectedRow === rowData ? null : rowData);
  };

  const [tableData, setTableData] = useState([
    {
      delegate: "PMS",
      contacttype: "Care Team",
      contactname: "Smith, John",
      cellphone: 179458399,
      workphone: 788437943,
      email: "test1@gmail.com",
      preferred: "Cell Phone",
    },
    {
      delegate: "Health Home",
      contacttype: "Care Link",
      contactname: "Tessa, Adam",
      cellphone: 179458387,
      workphone: 788437956,
      email: "test2@gmail.com",
      preferred: "Work phone",
    },
    {
      delegate: "PMS",
      contacttype: "Delegated",
      contactname: "Levi, mark",
      cellphone: 179458367,
      workphone: 788437964,
      email: "test3@gmail.com",
      preferred: "Work Phone",
    },
  ]);
  const columns = [
    {
      field: "radio",
      title: "",
      render: (rowData) => (
        <Radio
          checked={selectedRow === rowData}
          onClick={() => handleRowSelection(rowData)}
        />
      ),
    },
    {
      title: "Delegate",
      field: "delegate",
      align: "center",
    },
    {
      title: "Contact Type",
      field: "contacttype",
      align: "center",
    },
    {
      title: "Contact Name",
      field: "contactname",
      align: "center",
    },
    {
      title: "Cell Phone",
      field: "cellphone",
      align: "center",
    },
    {
      title: "Work Phone",
      field: "workphone",
      align: "center",
    },
    {
      title: "Email",
      field: "email",
      align: "center",
    },
    {
      title: "Preferred",
      field: "preferred",
      align: "center",
    },
  ];

  const body = (
    <>
      <Grid container>
        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
          <DialogContent style={{ paddingTop: 0 }}>
            <Grid container className={classes.typoHeaderContainer}>
              <Grid item xs={8}>
                <Typography className={classes.typoHeader}>
                  Assign Delegated Contact
                </Typography>
              </Grid>
              <Grid item xs={4} style={{ textAlign: "right" }}>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={handleClose}
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Paper elevation={0} className={classes.contentPaper}>
                  <div className={classes.customToolbar}>
                    <MaterialTable
                      columns={columns}
                      data={tableData}
                      title=""
                      options={{ search: false, pageSize: 3 }}
                      onSelectionChange={(rows) =>
                        setSelectedRow(rows.length > 0 ? rows[0] : null)
                      }
                    />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <Grid container>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "30px",
                paddingBottom: "4px",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{
                  borderRadius: 0,
                  height: "27px",
                  textTransform: "capitalize",
                }}
                onClick={handleReplace}
              >
                Replace
              </Button>
            </Grid>
          </Grid>
        </Dialog>
      </Grid>
    </>
  );

  return (
    <React.Fragment>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modal}
        >
          {body}
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default DelegatedDialog;
