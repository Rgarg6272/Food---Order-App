import React, { useEffect, useState } from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import AddBox from "@material-ui/icons/AddBox";
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

    useEffect(() => {
        setCount(tableData && tableData.length > 0 ? tableData.length : 0);
    }, []);

    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [assignDeleDialogOpen, setAssignDeleDialogOpen] = useState(false);
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
                        localization={{
                            body: {
                                emptyDataSourceMessage: (
                                    <div
                                        style={{
                                            color: "#A71930",
                                            fontWeight: "bold",
                                        }}
                                    >  
                                    </div>
                                ),
                            },
                        }}
                        autoHeight={true}
                        icons={tableIcons}
                        data={tableData}
                        tableRef={tableRef}
                        options={{
                            detailPanelType: "single",
                            selection: false,
                            maxBodyHeight: "45vh",
                            overflowY: "hidden !important",
                            padding: "dense",
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
                            },
                            filterRowStyle: {
                                left: "0",
                                position: "sticky",
                                top: 43,
                                background: "#fff",
                                padding: "0.3em",
                                width: "100%",
                                zIndex: 1,
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
                                        props.onFilterChanged(props.columnDef.tableData.id, event.target.value);
                                    }}
                                />,
                                render: (rowData) => (
                                    <RenderValue value={rowData.SubscriberID} />
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
                                            <Button style={{ textTransform: 'capitalize', fontWeight: "bold", color: "#A71930" }} onClick={handleDeleDialog}>Replace</Button>
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
                    />
                    {assignDialogOpen && <AssingDeleDialog handleAssignCloseDialog={handleAssignCloseDialog} handleAddRow={handleAddRow}  dialogSelectedRow={selectedRow} />}
                    {assignDeleDialogOpen && <AssignDeleTableDialog/>}
                </div>
            </MuiThemeProvider>
        </div>
    );
};
export default MemberDeleContactsTable;
