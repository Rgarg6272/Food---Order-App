import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import {useStyles} from "../css/MemberDetails";

const DelegatedDialog = ({ handleCloseDialog }) => {import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  paperDialog: {
    position: "absolute",
    width: "90%",
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px 30px 17px",
    display: "flex",
    flexDirection: "column",
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
    justifyContent: "right",
  },
  typoHeaderContainer: {
    padding: "1rem 1rem 1rem 0rem",
  },
  typoHeader: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#000000",
  },
  leftDialog: {
    fontWeight: 700,
    fontSize: "14px",
    color: "#232323",
  },
  rightDialog: {
    fontWeight: 400,
    fontSize: "14px",
    color: "#232323",
  },
}));

const DelegatedDialog = ({ handleCloseDialog }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleCloseDialog();
  };

  const Data = [
    { id: 1, title: "Unreachable", output: "Yes", dess: ":" },
    { id: 2, title: "Contact Attempt Date 1", output: "03-17-2023", dess: ":" },
    { id: 3, title: "Contact Attempt Date 2", output: "-", dess: ":" },
    { id: 4, title: "Contact Attempt Date 3", output: "-", dess: ":" },
    { id: 5, title: "Letter sent date", output: "-", dess: ":" },
  ];

  const body = (
    <div className={classes.paperDialog}>
      <Grid container className={classes.typoHeaderContainer}>
        <Grid item xs={8}>
          <Typography className={classes.typoHeader}>Unreachable</Typography>
        </Grid>
        <Grid item xs={4} style={{ textAlign: "right" }}>
          <CloseIcon className={classes.closeIcon} onClick={handleClose} />
        </Grid>
      </Grid>
      <Grid container>
        {Data.map((data) => (
          <>
            <Grid item xs={6} key={data.id}>
              <Typography variant="caption" className={classes.leftDialog}>
                {data.title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="caption">{data.dess}</Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" className={classes.rightDialog}>
                {data.output}
              </Typography>
            </Grid>
          </>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.closeButtonGrid}>
          <Button
            variant="contained"
            onClick={handleClose}
            className={classes.closeButton}
          >
            Close
          </Button>
        </Grid>
      </Grid>
    </div>
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

    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        handleCloseDialog()
    };

    const Data = [
        { id: 1, title: "Unreachable", output: "Yes", dess: ":" },
        { id: 2, title: "Contact Attempt Date 1", output: "03-17-2023", dess: ":" },
        { id: 3, title: "Contact Attempt Date 2", output: "-", dess: ":" },
        { id: 4, title: "Contact Attempt Date 3", output: "-", dess: ":" },
        { id: 5, title: "Letter sent date", output: "-", dess: ":" },
    ];

    const body = (
        <div className={classes.paperDialog}>
            <Grid container className={classes.typoHeaderContainer}>
                <Grid item xs={8}>
                    <Typography className={classes.typoHeader}>Unreachable</Typography>
                </Grid>
                <Grid item xs={4} style={{ textAlign: "right" }}>
                    <CloseIcon className={classes.closeIcon} onClick={handleClose} />
                </Grid>
            </Grid>
            <Grid container>
                {Data.map((data) => (
                    <>
                        <Grid item xs={6} key={data.id}>
                            <Typography variant="caption" className={classes.leftDialog}>
                                {data.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="caption">{data.dess}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography variant="caption" className={classes.rightDialog}>{data.output}</Typography>
                        </Grid>
                    </>
                ))}
            </Grid>
            <Grid container>
                <Grid item xs={12} className={classes.closeButtonGrid}>
                    <Button
                        variant="contained"
                        onClick={handleClose}
                        className={classes.closeButton}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        </div>
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
}

export default DelegatedDialog;
