import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { Search } from "@material-ui/icons";
import { Button, Paper } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

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

  paperDialog: {
    position: "absolute",
    maxWidth: "55rem",
    height: "250px",
    maxHeight: "80vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px 30px 17px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  closeIcon: {
    position: "absolute",
    cursor: "pointer",
    color: "#A71930",
    right: "25px",
  },

  closeButton: {
    "&:hover": {
      background: "#14837B",
    },
    backgroundColor: "#14837B",
    textTransform: "capitalize",
    fontSize: "14px",
    fontWeight: 700,
    color: "#ffffff",
    borderRadius: 0,
    width: "28%",
  },

  closeButtonGrid: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginTop: "auto",
    paddingTop: "1rem",
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

const DelegatedDialog = ({ handleCloseDialog }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleCloseDialog();
  };

  const [tableData, setTableData] = useState([
    {
      delegate: "PMS",
      contacttype: "Care Team",
      contactname: "Smith, John",
      cellphone: 179458399,
      workphone: 788437943,
      email: "rajgarg@gmail.com",
      preferred: "Cell Phone",
    },
    {
      delegate: "PMS",
      contacttype: "Care Team",
      contactname: "Smith, John",
      cellphone: 179458399,
      workphone: 788437943,
      email: "rajgarg@gmail.com",
      preferred: "Cell Phone",
    },
    {
      delegate: "PMS",
      contacttype: "Care Team",
      contactname: "Smith, John",
      cellphone: 179458399,
      workphone: 788437943,
      email: "rajgarg@gmail.com",
      preferred: "Cell Phone",
    },
  ]);
  const columns = [
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
              >
                Assign
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
