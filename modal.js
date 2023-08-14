import React, { useState } from "react";
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
    height: "230px",
    maxHeight: "80vh",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "0px 30px 17px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  paperDialog1: {
    position: "absolute",
    width: "90%",
    maxWidth: 600,
    height: "230px",
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

const DelegatedDialog = ({ handleCloseDialog, dialogContent }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    handleCloseDialog();
  };

  const unreachableData = [
    { id: 1, title: "Unreachable", output: "Yes", dess: ":" },
    { id: 2, title: "Contact Attempt Date 1", output: "03-17-2023", dess: ":" },
    { id: 3, title: "Contact Attempt Date 2", output: "-", dess: ":" },
    { id: 4, title: "Contact Attempt Date 3", output: "-", dess: ":" },
    { id: 5, title: "Letter sent date", output: "-", dess: ":" },
  ];

  const careData = [
    { id: 1, title: "Care Coordination Refused", dess: ":", output: "Yes" },
    { id: 2, title: "Refused Date", dess: ":", output: "12-28-2022" },
    { id: 3, title: "Refused Reason", dess: ":", output: "Refused/Declined" },
  ];

  const cnaData = [
    {
      id: 1,
      title1: "CNA Refused",
      dess: ":",
      output1: "Yes",
      title2: "Call Date 2",
      output2: "12-29-2022",
    },
    {
      id: 2,
      title1: "Refused Date",
      dess: ":",
      output1: "-",
      title2: "Outcome Call 2",
      output2: "Unreachable",
    },
    {
      id: 3,
      title1: "Refused Reason",
      dess: ":",
      output1: "-",
      title2: "Call Date 3",
      output2: "12-30-2022",
    },
    {
      id: 4,
      title1: "Call Date 1",
      dess: ":",
      output1: "12-28-2022",
      title2: "Outcome call 3",
      output2: "Unreachable",
    },
    {
      id: 5,
      title1: "Outcome Call 1",
      dess: ":",
      output1: "Unreachable",
      title2: "Letter Sent Date",
      output2: "01-12-2023",
    },
  ];

  const touchPointData = [
    {
      id: 1,
      title: "Telephonic Touchpoint Date",
      dess: ":",
      output: "01-01-2023",
    },
    { id: 2, title: "In-Person Touchpoint Date", dess: ":", output: "-" },
  ];

  const careTransition = [
    {
      id: 1,
      title: "Transition Of Care",
      dess: ":",
      output: "Yes",
    },
    { id: 2, title: "Received Date from PHP", dess: ":", output: "02-27-2023" },
    { id: 3, title: "Assessment Date", dess: ":", output: "08-02-2023" },
  ];

  const body = (
    <div
      className={
        dialogContent === "delegated cna"
          ? classes.paperDialog1
          : classes.paperDialog
      }
    >
      {dialogContent === "delegated unreachable" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                Unreachable
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {unreachableData.map((data) => (
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
        </>
      )}
      {dialogContent === "delegated care" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                Care Coordination Refused
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {careData.map((data) => (
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
        </>
      )}
      {dialogContent === "delegated cna" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                CNA Refused
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {cnaData.map((data) => (
              <>
                <Grid item xs={3} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title1}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output1}
                  </Typography>
                </Grid>
                <Grid item xs={3} key={data.id}>
                  <Typography variant="caption" className={classes.leftDialog}>
                    {data.title2}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography variant="caption">{data.dess}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="caption" className={classes.rightDialog}>
                    {data.output2}
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
        </>
      )}
      {dialogContent === "delegated touchpoint" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>Touchpoint</Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {touchPointData.map((data) => (
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
        </>
      )}
      {dialogContent === "delegated transition" && (
        <>
          <Grid container className={classes.typoHeaderContainer}>
            <Grid item xs={8}>
              <Typography className={classes.typoHeader}>
                Transition Of Care
              </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: "right" }}>
              <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <Grid container>
            {careTransition.map((data) => (
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
        </>
      )}
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
