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

  paperDialog1: {
    position: "absolute",
    width: "90%",
    maxWidth: 600,
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
