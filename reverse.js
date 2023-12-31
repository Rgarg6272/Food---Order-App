import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import { Button, Paper } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Radio from "@material-ui/core/Radio";
import TextField from "@material-ui/core/TextField";
import AlertDeleDialog from "./AlertDeleDialog";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { DelegatedContactData, AdDelegateContactData } from "../../../constants/memberData";
import { commonFontSizes } from "../../css/FontSizes";
import { TablePagination } from "@material-ui/core";
import MaterialTable, { MTableToolbar } from "material-table";
import { Column } from "jspdf-autotable";


const AssignDeleTableDialog = ({ handleDeleTableClose, handleAddRow }) => {
    const classes = useStyles();
    const [tableData, setData] = useState(DelegatedContactData);
    const [count, setCount] = useState(tableData && tableData.length > 0 ? tableData.length : 0);
    const tableStyle = {
        border: "1px solid lightgray",
    }
    const CellBorderStyle = {
        border: "1px solid lightgray",
    }
    const getPageSizeOptions = () => {
        return [5, 10]; 
      };

    const CustomRadio = ({isChecked, isEven, onSelect}) => {
        return (
            <Radio checked={isChecked} onClick={onSelect} style={{color: isEven ? "blue" : "red"}}/>
        );
    };

    const columns = [
        {
            title: "",
            render: rowData => (
                <CustomRadio isChecked={selectedRow === rowData} isEven={rowData.tableData.id % 2 === 0}
                onSelect={() => handleRowSelection(rowData)}
                />
            ),
            cellStyle: {
                padding: "0",
                textAlign: "center",
                minWidth: 30,
                maxWidth: 30,
            },
            align: 'start'
        },
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
            align: 'start'
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
            align: 'start'
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
            align: 'start'
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
            align: 'start'
        },
    ];
    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(true);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    useEffect(() => {
        if(tableData.length > 0) {
            setSelectedRow(tableData[0]);
        }
    }, [tableData]);
    const handleRowSelection = (rowData) => {
        console.log("selected row data", rowData);
        setSelectedRow(rowData);
    };
    const handleClose = () => {
        setOpen(false);
        handleDeleTableClose()
    };
    const handleAssign = () => {
        setOpen(false);
        setSearchDialogOpen(true);
    };
    const handleAlertDeleClose = () => {
        setSearchDialogOpen(false);
    }
    const Replacebody = (
        <>
         <Grid container>
                <Dialog
                    open={open}
                    onClose={() => setSearchDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogContent style={{ paddingTop: 0, paddingBottom: '30px' }}>
                        <Grid container className={classes.typoHeaderContainer}>
                            <Grid item xs={8}>
                                <Typography className={classes.typoHeader}>
                                    Replace Delegated Contact
                                </Typography>
                            </Grid>
                            <Grid item xs={4} style={{ textAlign: "right" }}>
                                <CloseIcon
                                    className={classes.closeIcon}
                                    onClick={handleClose}
                                />
                            </Grid>
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
                                marginRight: "25px",
                                position: 'relative',
                                bottom: '17px'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    borderRadius: 0,
                                    height: "30px",
                                    textTransform: "capitalize",
                                    backgroundColor: '#217e76'
                                }}
                            >
                                Replace
                            </Button>
                        </Grid>
                    </Grid>
                </Dialog>
            </Grid>
        </>
    );
    const Assignbody = (
        <>
            <Grid container>
                <Dialog
                    open={open}
                    onClose={() => setSearchDialogOpen(false)}
                    maxWidth="lg"
                    fullWidth
                >
                    <DialogContent style={{ paddingTop: 0, paddingBottom: '30px' }}>
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
                    </DialogContent>
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            style={{
                                display: "flex",
                                justifyContent: "end",
                                marginRight: "25px",
                                position: 'relative',
                                bottom: '17px'
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                style={{
                                    borderRadius: 0,
                                    height: "30px",
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
                {Assignbody}
            </Modal>
            {searchDialogOpen && <AlertDeleDialog handleAlertDeleClose={handleAlertDeleClose} handleAddRow={handleAddRow}
                selectedRowData={selectedRow} />}
        </div>
    );
};

export default AssignDeleTableDialog;
