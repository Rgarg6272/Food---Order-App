import { forwardRef } from "react";
import React, { useEffect, useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import { TablePagination, IconButton, Grid, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { commonFontSizes } from "../../css/FontSizes";
import { DelegatedContactData, AdDelegateContactData } from "../../../constants/memberData";
import { memberDelegatedContactData } from "../../../constants/memberData";
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { searchButtonStyles } from "../../css/SearchButtonStyles";
import { useStyles } from "../../css/MemberDetails";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import AssingDeleDialog from "../../pages/DelegatedContacts/AssignDeleDialog";
import AssignDeleTableDialog from "../../pages/DelegatedContacts/AssignDeleTableDialog";

const drawerWidth = 200;

export const MemberDeleContactsTable = () => {
    const [tableData, setData] = useState(memberDelegatedContactData);
    const [data2, setData2] = useState([]);
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackSev, setSnackSev] = useState("");
    const [snackMsg, setSnackMsg] = useState("");
    const tableRef = React.createRef();
    const [showDialog, setshowDialog] = useState(false);
    const [count, setCount] = useState(tableData && tableData.length > 0 ? tableData.length : 0);
    const [memberInfo, setMemberInfo] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [addHeader, setAddHeader] = useState("");
    const [addData, setAddData] = useState("");
    const [flag, setFlag] = useState("");
    const [rowId, setRowId] = useState("");
    const classes = useStyles();
    const classes1 = searchButtonStyles();

    let nullObject = null;
    let data1 = {};
    let noData1 = "";

    const history = useHistory();

    const getPageSizeOptions = () => {
        return [5, 10];
    };

    const AddNewLevel = (flag) => {
        setAddData(AdDelegateContactData);
        setFlag(flag);
        setAddHeader("Add New Contact");
        setDialogOpen(true);
    }

    const handleCloseDialog = (memberFormData, flag, RowId) => {
        setDialogOpen(false);
        if (flag === 'edit') {
            if (memberFormData) {
                const updatedData = tableData.map(item => {
                    if (item.id === RowId) {
                        const id = RowId;
                        return { ...memberFormData, id }; //Replace row with new data and same id
                    }
                    return item;
                });
                setData(updatedData);
                setDialogOpen(false);
            } else {
                setDialogOpen(false);
            }
        } else {
            if (memberFormData) {
                setData([...tableData, memberFormData]);
                setDialogOpen(false);
            } else {
                setDialogOpen(false);
            }
        }
    }
    useEffect(() => {
        setCount(tableData && tableData.length > 0 ? tableData.length : 0);
    }, []);

    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [assignDeleDialogOpen, setAssignDeleDialogOpen] = useState(false);
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [showReplaceDialog, setShowReplaceDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleDialog = () => {
        setAssignDialogOpen(true);
    }

    const handleDeleDialog = () => {
        setAssignDeleDialogOpen(true);
    }

    const handleAssignCloseDialog = () => {
        setAssignDialogOpen(false);
    }

    const handleAddRow = (rowData) => {
        console.log("which row", rowData);
        setData([...tableData, rowData]);
    };

    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <div class="tableContainer1">
                    <MaterialTable
                        key={count}
                        title="Claims"
                        class="input"
                        autoHeight={true}
                        icons={tableIcons}
                        data={tableData}
                        tableRef={tableRef}
                        columns={[
                            {
                                title: "Subscriber ID",
                                field: "SubscriberID",
                                filtering: true,
                                cellStyle: {
                                    // textDecoration: "underline",
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{ height: "2rem" }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" >
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,
                                render: (rowData) => (
                                    <RenderValue value={rowData.SubscriberID} />
                                ),
                            },
                            {
                                title: "Jiva Member ID",
                                field: "JivaMemberID",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{ height: "2rem" }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,
                                render: (rowData) => (
                                    <RenderValue value={rowData.JivaMemberID} />
                                ),
                            },
                            {
                                title: "Member First Name",
                                field: "MemberFirstName",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{
                                        height: "2rem", minWidth: 130,
                                        maxWidth: 130,
                                    }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,
                                render: (rowData) => (
                                    <RenderValue value={rowData.MemberFirstName} />
                                ),
                            },
                            {
                                title: "Member Last Name",
                                field: "MemberLastName",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{
                                        height: "2rem", minWidth: 130,
                                        maxWidth: 130
                                    }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,
                                render: (rowData) => (
                                    <RenderValue value={rowData.MemberLastName} />
                                ),
                            },
                            {
                                title: "Delegate",
                                field: "Delegate",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{ height: "2rem" }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,

                                render: (rowData) => (
                                    <RenderValue value={rowData.Delegate} />
                                ),
                            },
                            {
                                title: "Contact Type",
                                field: "Contact_Type",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 190,
                                    maxWidth: 190,
                                },
                                filterComponent: (props) => <TextField
                                    style={{
                                        height: "2rem", minWidth: 130,
                                        maxWidth: 130
                                    }}
                                    type="search"
                                    placeholder='Search'
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end" style={{ paddingRight: '6px' }}>
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,

                                render: (rowData) => (
                                    <RenderValue value={rowData.Contact_Type} />
                                ),
                            },
                            {
                                title: "Action",
                                field: "Action",
                                filtering: false,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 150,
                                    maxWidth: 150,
                                },
                                render: (rowData) => (
                                    <div style={{ dispaly: "flex" }}>
                                        <IconButton
                                            style={{ padding: "0px 6px 0px 2px" }}
                                            aria-label="edit"
                                        >
                                            <Button style={{ textTransform: 'capitalize', fontWeight: "bold", color: "#A71930" }} onClick={handleDeleDialog}>Replace</Button>
                                        </IconButton>
                                        <span>|</span>
                                        <IconButton
                                            style={{ padding: "0px 6px 0px 8px" }}
                                            aria-label="edit"
                                        >
                                            <span class="material-symbols-outlined e7fe" style={{ color: '#861426', width: "1.2rem", height: "1.2rem", cursor: "pointer" }}>
                                                person_off
                                            </span>
                                        </IconButton>
                                    </div>
                                ),
                            }, 
                        ]}
                    />
                    {assignDialogOpen && <AssingDeleDialog handleAssignCloseDialog={handleAssignCloseDialog} handleAddRow={handleAddRow} dialogSelectedRow={selectedRow} />}
                    {assignDeleDialogOpen && <AssignDeleTableDialog flag="replace" handleDeleTableClose={() => setAssignDeleDialogOpen(false)}
                        handleAddRow={handleAddRow}
                    />}

                </div>
            </MuiThemeProvider>
        </div>
    );
};
export default MemberDeleContactsTable;
