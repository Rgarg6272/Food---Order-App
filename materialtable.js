import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MaterialTable from "material-table";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "relative",
    width: "90%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },

  closeButton: {
    position: "absolute",
    cursor: "pointer",
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
}));

export default function SimpleModal() {
  const data = [
    {
      name: "John Doe",
      age: 30,
      gender: "Male",
      delegated: "View details",
    },
  ];
  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age", type: "numeric" },
    { title: "Gender", field: "gender" },
    {
      title: "Bio Data",
      field: "delegated",
      render: (rowData) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <a style={{ cursor: "pointer" }} onClick={() => handleOpen(rowData)}>
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
            <ExitToAppIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleOpen(rowData)}
            />
          </a>
        </div>
      ),
    },
  ];

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <CloseIcon className={classes.closeButton} onClick={handleClose} />
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <Button variant="contained" color="primary" onClick={handleClose}>
        Close
      </Button>
    </div>
  );

  return (
    <div>
      <MaterialTable
        title="User Data"
        columns={columns}
        data={data}
        options={{ search: false, paging: false, sorting: false }}
      />

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
  );
}
