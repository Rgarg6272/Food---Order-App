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
import AssingDeleDialog from "../../pages/DelegatedContacts/AssignDeleDialog";
import AssignDeleTableDialog from "../../pages/DelegatedContacts/AssignDeleTableDialog";

export const MemberDeleContactsTable = () => {
    const [tableData, setData] = useState(memberDelegatedContactData);
    const [data2, setData2] = useState([]);
   
    const [showDialog, setshowDialog] = useState(false);
    const [count, setCount] = useState(tableData && tableData.length > 0 ? tableData.length : 0);
    const [memberInfo, setMemberInfo] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [flag, setFlag] = useState("");
    const [rowId, setRowId] = useState("");
    const classes = useStyles();
    const classes1 = searchButtonStyles();

  

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

    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [assignDeleDialogOpen, setAssignDeleDialogOpen] = useState(false);
    const [showAssignDialog, setShowAssignDialog] = useState(false);
    const [showReplaceDialog, setShowReplaceDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [rowColors, setRowColors] = useState("");

    const handleDialog = () => {
        setAssignDialogOpen(true);
    }

    const handleOpenDialog = (rowData) => {
        setSelectedRow(rowData);
        setAssignDeleDialogOpen(true);
    }

    const handleBlockRow = (rowData) => {
        //console.log('idhandle::', rowData.id, ' ', rowData.enableEditIcon);
        const id = rowData.id - 1;
        if (rowData.enableEditIcon === false) {
            setRowColors((prevRowColors) => ({
                ...prevRowColors,
                [id]: "rgba(0, 0, 0, 0.38)"
            }));
            const updatedData = tableData.map((item) =>
                item.tableData.id === id ? { ...item, enableEditIcon: true } : item
            );
            //console.log('res::', updatedData)
            setData(updatedData);
        } else {
            //console.log('else')
            setRowColors((prevRowColors) => ({
                ...prevRowColors,
                [id]: "#555151"
            }));
            const updatedData = tableData.map((item) =>
                item.tableData.id === id ? { ...item, enableEditIcon: false } : item
            );
            // console.log('res::', updatedData)
            setData(updatedData);
        }
    }

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
                                title: "Contact Type",
                                field: "Contact_Type",
                                filtering: true,
                                cellStyle: {
                                  //  color: "#555151",
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
                                title: "Contact Name",
                                field: "Contact_Name",
                                filtering: true,
                                cellStyle: {
                                   // color: "#555151",
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
                                    <RenderValue value={rowData.Contact_Name} />
                                ),
                            },
                            {
                                title: "Cell Phone",
                                field: "Cell_Phone",
                                filtering: false,
                                cellStyle: {
                                  //  color: "#555151",
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
                                   // color: "#555151",
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
                                   // color: "#555151",
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
                                //    color: "#555151",
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
                                  //  color: "#555151",
                                    fontSize: commonFontSizes.bodyTwo + "rem",
                                    fontWeight: 400,
                                    minWidth: 150,
                                    maxWidth: 150,
                                },
                                render: (rowData) => {
                                    if(rowData.Contact_Type === 'Unassigned'){
                                        return  (
                                            <div style={{ dispaly: "flex" }}>
                                                 <IconButton
                                            style={{ padding: "0px 6px 0px 2px" }}
                                            aria-label="edit"
                                        >
                                            <Button style={{ textTransform: 'capitalize', fontWeight: "bold", color: "#A71930" }} onClick={() => handleOpenDialog(rowData)}>Assign</Button>
                                        </IconButton>
                                            </div>
                                        );
                                    } else{
                                        return (
                                            <div style={{ dispaly: "flex" }}>
                                            <IconButton
                                                style={{ padding: "0px 6px 0px 2px" }}
                                                aria-label="edit"
                                                onClick={() =>{ handleOpenDialog(rowData) && rowData.enableEditIcon == false}}
                                            >
                                                <Button style={{ textTransform: 'capitalize', fontWeight: "700" }} className={rowData.enableEditIcon == false ? classes.enableIcon : classes.disableIcon}  >Replace</Button>
                                            </IconButton>
                                            <span>|</span>
                                            <IconButton
                                                style={{ padding: "0px 6px 0px 8px" }}
                                                aria-label="edit"
                                                onClick={() => {
                                                    handleBlockRow(rowData)
                                                }}
                                            >
                                                {rowData.enableEditIcon == false ?
                                                    <span class="material-symbols-outlined e7fe" style={{ color: '#861426', width: "1.2rem", height: "1.2rem", cursor: "pointer" }}>
                                                        person_off
                                                    </span> :
                                                    <span class="material-symbols-outlined e7fe" style={{ color: '#861426', width: "1.2rem", height: "1.2rem", cursor: "pointer" }}>
                                                        person_add
                                                    </span>
                                                }
                                            </IconButton>
                                        </div>
                                        );
                                       
                                    }
                                }   
                            },
                        ]}
                    />
                    {assignDialogOpen && <AssignDeleTableDialog handleDeleTableClose={() => setAssignDeleDialogOpen(false)}
                        handleAddRow={handleAddRow} handleReplaceRow={handleReplaceRow}
                    />}
                    {assignDeleDialogOpen && <AssignDeleTableDialog flag="replace" handleDeleTableClose={() => setAssignDeleDialogOpen(false)}
                        handleAddRow={handleAddRow} handleReplaceRow={handleReplaceRow}
                    />}

                </div>
            </MuiThemeProvider>
        </div>
    );
};
export default MemberDeleContactsTable;
