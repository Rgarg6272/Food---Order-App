import React, { useState, useEffect } from "react";
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
//import { table } from "console";



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
    borderedRow: {
        borderBottom: "1px solid lightgray",
    },
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

const AssignDeleTableDialog = ({ flag, handleDeleTableClose, handleAddRow }) => {
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
        // console.log('count::', count)
        return [5, 10];
        // if (count <= 5) {
        //   return [count];
        // } else if (count <= 10) {
        //   return [5, count];
        // } else if (count <= 20) {
        //   return [5, 10, count];
        // } else {
        //   return [5, 10, 20, count];
        // }
    };

    const CustomRadio = ({ isChecked, isEven, onSelect }) => {
        return (
            <Radio checked={isChecked} onClick={onSelect} style={{ color: isEven ? "#217e76" : "#217e76" }} />
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
                // width: "1px",
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
        {
            title: "Work Phone",
            field: "Work_Phone",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400
            },
            align: 'start'
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
            align: 'start'
        },
        {
            title: "Preferred",
            field: "Preferred",
            filtering: false,
            cellStyle: {
                color: "#555151",
                fontSize: commonFontSizes.bodyTwo + "rem",
                fontWeight: 400,
            },
            align: 'start'
        },
    ];


    const [selectedRow, setSelectedRow] = useState(null);
    const [open, setOpen] = useState(true);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);
    const [clickedButton, setClickedButton] = useState(null);

    useEffect(() => {
        if (tableData.length > 0) {
            setSelectedRow(tableData[0]);
        }
    }, [tableData]);



    const handleRowSelection = (rowData) => {
        console.log("selected row data", rowData);
        //setSelectedRow(selectedRow === rowData ? null : rowData);
        setSelectedRow(rowData);
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

        // if(selectedRow) {
        //     const newRow = {...selectedRow};
        //     const missingColumns = mainTableColumns
        //          .filter(column => !newRow[column.field])
        //          .map(column => column.field);
        //     missingColumns.forEach(column => {
        //         newRow[column] = "-";
        //     });
        //     handleAddRow(newRow);

        // }
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
                        <Grid container>
                            <Grid item xs={12}>
                                <Paper elevation={0} className={classes.contentPaper}>
                                    <div className={classes.customToolbar}>
                                        <MuiThemeProvider theme={theme}>
                                            <div className="tableContainer1" style={tableStyle}>
                                                <MaterialTable
                                                    autoHeight={true}
                                                    key={count}
                                                    data={tableData}
                                                    columns={columns}
                                                    options={{
                                                        paging: false,
                                                        search: false,
                                                        toolbar: false,
                                                        sorting: false,
                                                        detailPanelType: "single",
                                                        selection: false,
                                                        maxBodyHeight: "40vh",
                                                        overflowY: "hidden !important",
                                                        padding: "dense",
                                                        filtering: false,
                                                        showTitle: false,
                                                        doubleHorizontalScroll: false,
                                                        headerStyle: {
                                                            whiteSpace: "nowrap",
                                                            position: "sticky",
                                                            fontWeight: 700,
                                                            fontSize: commonFontSizes.bodyTwo + "rem",
                                                            color: "#2C2B2C",
                                                            border: "0px solid lightgrey",
                                                            textAlign: "start"
                                                        },
                                                        cellStyle: () => CellBorderStyle,
                                                        rowStyle: (row) => {
                                                            const id = row.tableData.id;
                                                            return {
                                                                backgroundColor: id % 2 === 0 ? "#F5F5F5" : "#fff",
                                                                borderBottom: "1px solid lightgray",
                                                                borderTop: id === 0 ? "1px solid lightgray" : "none",
                                                            }
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
                        <Grid container>
                            <Grid item xs={12}>
                                <div style={{ position: 'relative', left: '1px', bottom: '10px' }}>
                                    <label>
                                        Subscriber ID
                                        </label>
                                </div>
                                <form className={classes.root} noValidate autoComplete="off" style={{ position: 'relative', left: '-5px', bottom: '10px' }}>
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
                                            borderRadius: "4px",
                                            textTransform: "capitalize",
                                            backgroundColor: '#217e76',
                                            position: "relative",
                                            left: '15px',
                                            width: '10rem'
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
                                                    key={count}
                                                    data={tableData}
                                                    columns={columns}
                                                    options={{
                                                        paging: false,
                                                        search: false,
                                                        toolbar: false,
                                                        sorting: false,
                                                        detailPanelType: "single",
                                                        selection: false,
                                                        maxBodyHeight: "40vh",
                                                        overflowY: "hidden !important",
                                                        padding: "dense",
                                                        filtering: false,
                                                        showTitle: false,
                                                        doubleHorizontalScroll: false,
                                                        headerStyle: {
                                                            whiteSpace: "nowrap",
                                                            position: "sticky",
                                                            fontWeight: 700,
                                                            fontSize: commonFontSizes.bodyTwo + "rem",
                                                            color: "#2C2B2C",
                                                            border: "0px solid lightgrey",
                                                            textAlign: "start"
                                                        },
                                                        cellStyle: () => CellBorderStyle,
                                                        rowStyle: (row) => {
                                                            const id = row.tableData.id;
                                                            return {
                                                                backgroundColor: id % 2 === 0 ? "#F5F5F5" : "#fff",
                                                                borderBottom: "1px solid lightgray",
                                                                borderTop: id === 0 ? "1px solid lightgray" : "none",
                                                            }
                                                        },
                                                        // pageSize: count < 10 ? parseInt(count) + 1 : 10,
                                                        // pageSizeOptions: [
                                                        //   5,
                                                        //   10,
                                                        //   20,
                                                        //   { value: count > 0 ? count : 1, label: "All" },
                                                        // ],
                                                    }}
                                                // components={{
                                                //     Toolbar: (props) => (
                                                //       <div>
                                                //         <MTableToolbar {...props} />
                                                //       </div>
                                                //     ),
                                                //     Pagination: (props) => (
                                                //       <div style={{ borderTop: "1px solid lightgrey" }}>
                                                //         <TablePagination
                                                //           {...props}
                                                //           style={{
                                                //             backgroundColor: "",
                                                //             float: "right",
                                                //             maxHeight: "2.6rem",
                                                //             overflow: "hidden",
                                                //             paddingBottom:"0.5rem"
                                                //           }}
                                                //           rowsPerPageOptions={getPageSizeOptions()}
                                                //         />
                                                //       </div>
                                                //     ),
                                                //   }}
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
                                marginRight: "25px",
                                position: 'relative',
                                bottom: '14px'
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
                {/* {Assignbody} */}
                {flag === "replace" ? Replacebody : Assignbody}
            </Modal>
            {searchDialogOpen && <AlertDeleDialog handleAlertDeleClose={handleAlertDeleClose} handleAddRow={handleAddRow}
                selectedRowData={selectedRow} />}
        </div>
    );
};

export default AssignDeleTableDialog;
