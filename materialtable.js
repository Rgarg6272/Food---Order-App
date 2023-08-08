import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import InfoIcon from "@material-ui/icons/Info";
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
    position: "absolute",
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

const data = [
  {
    name: "John Doe",
    age: 30,
    gender: "Male",
    bio: "Details about John Doe...",
  },
];

export default function SimpleModal() {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age", type: "numeric" },
    { title: "Gender", field: "gender" },
    {
      title: "Bio Data",
      render: (rowData) => (
        <InfoIcon
          onClick={() => handleOpen(rowData)}
          style={{ cursor: "pointer" }}
        />
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
      >
        {body}
      </Modal>
    </div>
  );
}
