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
import TextField from "@material-ui/core/TextField";
import AlertDeleDialog from "./AlertDeleDialog";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DelegatedContactData, AdDelegateContactData } from "../../../constants/memberData";
import { commonFontSizes } from "../../css/FontSizes";

const theme = createMuiTheme({
    overrides: {
        MuiToolbar: {
            regular: {
                height: "2.937em",
                minHeight: "0.625em",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                "@media(max-width:37.5em)": {
                    minHeight: "fit-content",
                    height: "fit-content",
                },
            },
        },

        MuiInput: {
            underline: {
                "&&&:before": {
                    borderBottom: "none",
                },
                "&&&:after": {
                    borderBottom: "none",
                },
                "&&&:not(.Mui-disabled):hover::before": {
                    borderBottom: "none",
                },
            },
        },
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: "5px",
            width: "25ch",
        },
    },
    customInput: {
        padding: "10px 12px",
    },
    customLabel: {
        transform: "translate(14px, -6px) scale(0.75)",
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

const AssignDeleTableDialog = ({ handleDeleTableClose, handleAddRow }) => {
    const classes = useStyles();
    const [tableData, setData] = useState(DelegatedContactData);

    const tableStyle = {
        border: "1px solid lightgray",
    }

    const CellBorderStyle = {
        border: "1px solid lightgray",
    }

    const columns = [
        {
            title: "Delegate",
            field: "Delegate",
            filtering: true,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 600,
                minWidth: 190,
                maxWidth: 190,
            },
            align: 'center'
        },
        {
            title: "Contact Type",
            field: "Contact_Type",
            filtering: true,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400,
            },
            align: 'center'
        },
        {
            title: "Contact Name",
            field: "Contact_Name",
            filtering: true,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'center'
        },
        {
            title: "Cell Phone",
            field: "Cell_Phone",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'center'
        },
        {
            title: "Work Phone",
            field: "Work_Phone",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'center'
        },
        {
            title: "Email",
            field: "Email",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'center'
        },
        {
            title: "Preferred",
            field: "Preferred",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'center'
        },
    ];


    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(true);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);

    const handleRowSelection = (rowData) => {
        console.log("selected row data", rowData);
        setSelectedRow(selectedRow === rowData ? null : rowData);
    };

    const handleClose = () => {
        setOpen(false);
        handleDeleTableClose()
    };

    // const handleAssign = () => {
    //   if (selectedRow) {
    //     setOpen(false);
    //     setSearchDialogOpen(true);

    //     handleAddRow(selectedRow);
    //   }
    // };

    const handleAssign = () => {
        setOpen(false);
        setSearchDialogOpen(true);
    };

    const handleAlertDeleClose = () => {
        setSearchDialogOpen(false);
    }

    const body = (
        <>
            <Grid container>
                <Dialog
                    open={open}
                    onClose={() => setSearchDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogContent style={{ paddingTop: 0, paddingBottom: '25px' }}>
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
                            <div style={{position: 'relative', left: '1px'}}>
                                        <label>
                                            Subscriber ID
                                        </label>
                                    </div>
                                <form className={classes.root} noValidate autoComplete="off" style={{position: 'relative', left: '-5px'}}>
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        InputProps={{
                                            classes: { input: classes.customInput },
                                        }}
                                        InputLabelProps={{
                                            classes: { outlined: classes.customLabel },
                                            shrink: true,
                                        }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                            borderRadius: 0,
                                            textTransform: "capitalize",
                                            backgroundColor: '#217e76'
                                        }}
                                    >
                                        Search Contact
                                    </Button>
                                </form>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper elevation={0} className={classes.contentPaper}>
                                    <div className={classes.customToolbar}>
                                        <MuiThemeProvider theme={theme}>
                                            <div className="tableContainer1" style={tableStyle}>
                                                <MaterialTable
                                                    autoHeight={true}
                                                    data={tableData} 
                                                    columns={columns}
                                                    options={{
                                                        paging:false,
                                                        search: false,
                                                        toolbar: false,
                                                        sorting: false,
                                                        detailPanelType: "single",
                                                        selection: false,
                                                        maxBodyHeight: "40vh",
                                                        overflowY: "hidden !important",                                             
                                                        padding: "dense",
                                                        filtering: false,
                                                        searchFieldStyle: {
                                                            padding: "0px 0px 0px 10px",
                                                            margin: "0px 0 0 0 ",
                                                            disableUnderline: true,
                                                            border: "0.5px solid #A19D9D",
                                                            height: "100%",
                                                            width: "18rem",
                                                            borderRadius: "4px"
                                                        },
                                                        showTitle: false,
                                                        doubleHorizontalScroll: false,
                                                        headerStyle: {
                                                            whiteSpace: "nowrap",
                                                            position: "sticky",
                                                            fontWeight: 700,
                                                            fontSize: commonFontSizes.bodyTwo + "rem",
                                                            color: "#2C2B2C",
                                                            border: "0px solid lightgrey",
                                                            textAlign: "center"
                                                        },
                                                        filterRowStyle: {
                                                            left: "0",
                                                            position: "sticky",
                                                            top: 43,
                                                            background: "#fff",
                                                            padding: "0.3em",
                                                            width: "100%",
                                                            zIndex: 1 
                                                        },
                                                        cellStyle: () => CellBorderStyle,
                                                        rowStyle: (row) => {
                                                            const id = row.tableData.id;
                                                            return id % 2 === 0
                                                                ? { backgroundColor: "#F5F5F5" }
                                                                : { backgroundColor: "#fff" };
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </MuiThemeProvider>
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
                                position: 'relative',
                                bottom: '10px'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    borderRadius: 0,
                                    height: "27px",
                                    textTransform: "capitalize",
                                    backgroundColor: '#217e76'
                                }}
                                onClick={handleAssign}
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
            {searchDialogOpen && <AlertDeleDialog handleAlertDeleClose={handleAlertDeleClose} handleAddRow={handleAddRow}
                selectedRowData={selectedRow} />}
        </div>
    );
};

export default AssignDeleTableDialog;
