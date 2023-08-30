import { forwardRef } from "react";
import React, { useEffect, useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
// import { useHistory } from "react-router-dom";
import "jspdf-autotable";
import { TablePagination, IconButton, Grid } from "@material-ui/core";
// import ClaimDetails from "../ClaimDetail/ClaimsDetails";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { CsvBuilder } from "filefy";
import jsPDF from "jspdf";
import { commonFontSizes } from "../../css/FontSizes";
import { DelegatedContactData, AdDelegateContactData } from "../../../constants/memberData";
import { memberDelegatedContactData } from "../../../constants/memberData";
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import { InputAdornment, TextField } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { searchButtonStyles } from "../../css/SearchButtonStyles";
import { useStyles } from "../../css/MemberDetails";
// import { setFlagsFromString } from "v8";
import AddNewCareDialog from "../../common/AddNewCareDialog";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import AssingDeleDialog from "../../pages/DelegatedContacts/AssignDeleDialog";


const drawerWidth = 200;

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight style={{ color: "#A71930" }} {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),

    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
function RenderValue(props) {
    return (
        <div>{props.value === " " || props.value === null ? "-" : props.value}</div>
    );
}
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

export const MemberDeleContactsTable = () => {
    const [tableData, setData] = useState(memberDelegatedContactData);
    //const [claimsLoading, setLoading] = useState(loading);
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

    const handleSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackOpen(false);
    };
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

    // const handleClick = () => {
    //   handleOpenPatientDetails();
    // };
    // const handlePanelOpen = (rowData) => {
    //   setData2(rowData);
    //   handleTableData(rowData);
    //   const claimsDetails = {
    //     rowData: rowData,
    //     showClaimsDetials: true,
    //   };
    //   localStorage.setItem("claimDetails", JSON.stringify(claimsDetails));
    //   OpenClaimDetails();
    // };
    // const handlePanel = () => {
    //   setshowDialog(false);
    // };

    // const handleClick = (rowData) => {
    //   history.push('/MainMemberInfo')
    // };

    const AddNewLevel = (flag) => {
        //console.log('AdDelegateContactData::',AdDelegateContactData)
        setAddData(AdDelegateContactData);
        setFlag(flag);
        setAddHeader("Add New Contact");
        setDialogOpen(true);
    }

    const handleCloseDialog = (memberFormData, flag, RowId) => {
        setDialogOpen(false);
        //console.log("getmemberFormData::", memberFormData, '  ', flag,' ',RowId,' ',tableData );
        if (flag === 'edit') {
            if (memberFormData) {
                const updatedData = tableData.map(item => {
                    //console.log('id:;',item.id,' ',RowId)
                    if (item.id === RowId) {
                        const id = RowId;
                        return { ...memberFormData, id }; //Replace row with new data and same id
                    }
                    return item;
                });
                //console.log('updatedData::', updatedData)
                setData(updatedData);
                setDialogOpen(false);
                //console.log('tableData:', tableData);
            } else {
                setDialogOpen(false);
            }
        } else {
            if (memberFormData) {
                setData([...tableData, memberFormData]);
                setDialogOpen(false);
                //console.log('tableData:', tableData);
            } else {
                setDialogOpen(false);
            }
        }
    }

    const replaceRowById = (rowData) => {
        //console.log('rowData::', rowData.id);
        const newData =
        {
            Delegate: "new 1",
            Contact_Type: "new 1",
            Contact_Name: "new 1",
            Cell_Phone: "new 1",
            Work_Phone: "new 1",
            Email: "new 1",
            Preferred: "new 1",
        };

        const updatedData = tableData.map(item => {
            if (item.id === rowData.id) {
                const id = rowData.id;
                return { ...newData, id }; //Replace row with new data and same id
            }
            //console.log('item::', item)
            return item;
        });
        //console.log('updatedData::', updatedData)
        setData(updatedData);
        //console.log('tableData::', tableData)
    }

    const EditContactRowById = (rowData, flag) => {
        const updateMemberData = AdDelegateContactData.map((inputData) => {
            //console.log('date::', rowData);
            setRowId(rowData.id);
            let res = Object.values(rowData);
            if (rowData.flag === 'Add') {
                return {
                    ...inputData,
                    value: res[inputData.id - 1]
                };
            } else {
                return {
                    ...inputData,
                    value: res[inputData.id]
                };
            }

        })
        //console.log('updateMemberData::', updateMemberData)
        setAddData(updateMemberData);
        setFlag(flag);
        setAddHeader("Add New Contact");
        setDialogOpen(true);
    }

    useEffect(() => {
        // setLoading(loading);
        // setData(data);
        setCount(tableData && tableData.length > 0 ? tableData.length : 0);
    }, []);

    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const handleDialog = () => {
        setAssignDialogOpen(true);
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
                        localization={{
                            body: {
                                emptyDataSourceMessage: (
                                    <div
                                        style={{
                                            color: "#A71930",
                                            fontWeight: "bold",
                                            // fontSize: commonFontSizes.bodyTwo * accessibilityFontSize + "rem",
                                        }}
                                    >
                                        {" "}
                                        {/* {noData}{" "} */}
                                    </div>
                                ),
                            },
                        }}
                        // onRowClick={(event, rowData, togglePanel) =>
                        //   handleClick(rowData)
                        // }
                        autoHeight={true}
                        icons={tableIcons}
                        data={tableData}
                        // loading={claimsLoading}
                        // isLoading={claimsLoading}
                        tableRef={tableRef}
                        options={{
                            detailPanelType: "single",
                            selection: false,
                            maxBodyHeight: "45vh",
                            overflowY: "hidden !important",
                            // exportButton: true,
                            padding: "dense",
                            // pageSize: 10,
                            filtering: true,
                            search: false,
                            pageSize: count < 10 ? parseInt(count) + 1 : 10,
                            pageSizeOptions: [
                                5,
                                10,
                                20,
                                { value: count > 0 ? count : 1, label: "All" },
                            ],
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
                            toolbar: true,
                            doubleHorizontalScroll: false,
                            headerStyle: {
                                whiteSpace: "nowrap",
                                position: "sticky",
                                fontWeight: 700,
                                fontSize: commonFontSizes.bodyTwo + "rem",
                                color: "#2C2B2C",
                                borderTop: "0.0625em solid lightgray",
                                // height:"45px"
                            },
                            filterRowStyle: {
                                left: "0",
                                position: "sticky",
                                top: 43,
                                background: "#fff",
                                padding: "0.3em",
                                width: "100%",
                                zIndex: 1 /* optionally */,
                            },
                            cellStyle: {
                                whiteSpace: "nowrap",
                                fontSize: commonFontSizes.bodyTwo + "rem",
                                zIndex: 2,
                                cursor: "no-drop",
                                fontWeight: 400
                            },
                            rowStyle: (row) => {
                                const id = row.tableData.id;
                                return id % 2 === 0
                                    ? { backgroundColor: "#F5F5F5" }
                                    : { backgroundColor: "#fff" };
                            },
                        }}

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
                                        //console.log(event.target.value)
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
                                        //console.log(event.target.value)
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
                                    style={{ height: "2rem", minWidth: 130,
                                    maxWidth: 130, }}
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
                                        //console.log(event.target.value)
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
                                    style={{ height: "2rem", minWidth: 130,
                                    maxWidth: 130 }}
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
                                        //console.log(event.target.value)
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
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(event) => {
                                        //console.log(event.target.value)
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
                                    style={{ height: "2rem", minWidth: 130,
                                    maxWidth: 130 }}
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
                                        //console.log(event.target.value)
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,

                                render: (rowData) => (
                                    <RenderValue value={rowData.Contact_Type} />
                                ),
                            },
                            {
                                title: "Contact Name",
                                field: "Contact_Name",
                                filtering: true,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 160,
                                    maxWidth: 160,
                                },
                                filterComponent: (props) => <TextField
                                    style={{ height: "2rem",minWidth: 130,
                                    maxWidth: 130, }}
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
                                        //console.log(event.target.value)
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,

                                render: (rowData) => (
                                    <RenderValue value={rowData.Contact_Name} />
                                ),
                            },
                            {
                                title: "Cell Phone",
                                field: "Cell_Phone",
                                filtering: false,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 140,
                                    maxWidth: 140,
                                },
                                render: (rowData) => (
                                    <RenderValue value={rowData.Cell_Phone} />
                                ),
                            },
                            {
                                title: "Work Phone",
                                field: "Work_Phone",
                                filtering: false,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 140,
                                    maxWidth: 140,
                                },
                                render: (rowData) => (
                                    <RenderValue value={rowData.Work_Phone} />
                                ),
                            },
                            {
                                title: "Email",
                                field: "Email",
                                filtering: false,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 140,
                                    maxWidth: 140,
                                },
                                render: (rowData) => (
                                    <RenderValue value={rowData.Email} />
                                ),
                            },
                            {
                                title: "Preferred",
                                field: "Preferred",
                                filtering: false,
                                cellStyle: {
                                    color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 140,
                                    maxWidth: 140,
                                },
                                render: (rowData) => (
                                    <RenderValue value={rowData.Preferred} />
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
                                            <Button style={{ textTransform: 'capitalize', fontWeight: "bold", color: "#A71930" }}>Replace</Button>
                                        </IconButton>
                                        <span>|</span>
                                        <IconButton
                                            style={{ padding: "0px 6px 0px 8px" }}
                                            aria-label="edit"
                                        >
                                            <PersonAddDisabledIcon style={{
                                                color: "#A71930",
                                                fontWeight: 500,
                                                borderRadius: "50%"
                                            }} />
                                        </IconButton>
                                    </div>
                                ),
                            },
                        ]}

                        components={{
                            Toolbar: (props) => (
                                <Grid container style={{ height: "3.2rem" }}>
                                    <Grid item xs={12} style={{ textAlign: "end", padding: "0.5rem" }}>
                                        <Button className={classes1.searchbuttonEnable} style={{ textTransform: "none", width: "9rem", borderRadius: '0px', backgroundColor:"#217e76" }} onClick={handleDialog}
                                            variant="contained"
                                        >
                                            Assign Contact
                                        </Button>
                                        <div style={{ width: "13rem" }}>
                                            <MTableToolbar {...props} />
                                        </div>
                                    </Grid>
                                </Grid>
                            ),
                            Pagination: (props) => (
                                <div style={{ borderTop: "1px solid lightgrey" }}>
                                    <TablePagination
                                        {...props}
                                        style={{
                                            backgroundColor: "",
                                            float: "right",
                                            maxHeight: "2.8rem",
                                            overflow: "hidden",
                                            paddingBottom: "0.5rem"
                                        }}
                                        rowsPerPageOptions={getPageSizeOptions()}
                                    />
                                </div>
                            ),
                        }}
                    />
                    {/* {dialogOpen && (
                        <AddNewCareDialog handleCloseDialog={handleCloseDialog} tableDataId={tableData.length} addData={addData} addHeader={addHeader} flag={flag} rowId={rowId} />
                    )} */}
                    {assignDialogOpen && <AssingDeleDialog handleAssignCloseDialog={handleAssignCloseDialog} handleAddRow={handleAddRow}  dialogSelectedRow={selectedRow} />}
                </div>
            </MuiThemeProvider>

        </div>
    );
};
export default MemberDeleContactsTable;
