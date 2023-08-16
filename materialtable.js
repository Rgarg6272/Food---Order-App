import React, { useState, useEffect, useRef } from "react";
import { useStyles } from "../../../css/MemberDetails";
import { claimsInputData } from "../../../../constants/memberData";
import {
  Button,
  TextField,
  Grid,
  Container,
  Paper,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  withStyles,
  TextareaAutosize,
  makeStyles,
  Breadcrumbs,
  Link
} from "@material-ui/core";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { Close } from "@material-ui/icons";
import MemberTable from "./MemberTable";
import { requestWrapper } from "../../../../utils/requestWrapper";
import { serviceUrls } from "../../../../utils/serviceUrls";
import Draggable from "react-draggable";
import { searchButtons, staticData } from "../../../../constants/StaticData";
import { radioclaimsData } from "../../../../constants/radioData";
import Tooltip from "@material-ui/core/Tooltip";
import { RadioButton } from "../../../common/RadioButton";
import SearchButton from "../../../common/SearchButton";
import { COMMONCSS } from "../../../css/CommonCss";
import { useCookies } from "react-cookie";
import { decode } from "jsonwebtoken";
import SimpleSnackbar from "../../../common/AlertMessage";
import { commonFontSizes } from "../../../css/FontSizes";
import { common } from "@material-ui/core/colors";
import { useLocation } from "react-router-dom";
import MemberSearchDialog from "../../../common/MemberSearchDialog";
import SearchDialog from "../../../common/SearchDialog";


const useStyles1 = makeStyles((theme) => COMMONCSS(theme));
const styles = (theme) => ({});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

function PaperComponent(props) {
  return (
    <Draggable handle="#hyperlink-dialog">
      <Paper {...props} />
    </Draggable>
  );
}

export const MemberSearch = (props) => {
  const location = useLocation();
  const [cookies] = useCookies("userName");
  let ppCookie = cookies.providerPortalCookie;
  let memberInfo = {};
  if (ppCookie) {
    memberInfo = decode(ppCookie);
  }
  const {
    accessibilityFontSize,
    imitateData: { taxIdVal, npi },
  } = props;
  const classes = useStyles();
  const classes1 = useStyles1();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [claimsData, setClaimsInputData] = useState(claimsInputData);
  const [open, setOpen] = useState(false);
  const [noData, setNoData] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSev, setSnackSev] = useState("");
  const [snackMsg, setSnackMsg] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [searchBtnDisable, setSearchBtnDisable] = useState(true);
  const [clearBtnDisable, setClearBtnDisable] = useState(true);
  const [showEndDateNote, setShowEndDateNote] = useState(false);
  const [claimsFormData, setClaimsFormData] = useState({
    claimNumber: "",
    firstName: "",
    memeberId: "",
    medicaidId: "",
    patientrSsn: "",
    lastName: "",
    dob: "",
  });
  const [value, setValue] = useState(
    location && location.input ? "nameDob" : "subsciberId"
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setClaimsInputData(
      claimsInputData.filter((inputItem) => {
        return inputItem.searchBy === value;
      })
    );
    if (location && location.input) {
      const filteredInputData = claimsInputData.filter((inputItem) => {
        return inputItem.searchBy === value;
      });
      setClaimsInputData(filteredInputData);
      const updatedInputData = filteredInputData.map((inputType) => {
        return {
          ...inputType,
          value: location.input[inputType.id],
        };
      });
      const updatedPayLoadData = {
        ...claimsFormData,
        firstName: location.input.firstName ? location.input.firstName : "",
        lastName: location.input.lastName ? location.input.lastName : "",
        dob: location.input.dob ? location.input.dob.replaceAll("-", "") : "",
        // ssn: value=== 'SSN' &&location.input.ssn? location.input.ssn:'',
        memberId: location.input.memberId ? location.input.memberId : "",
        medicaidId: location.input.medicaidId ? location.input.medicaidId : "",
      };
      setClaimsInputData(updatedInputData);
      setClaimsFormData(updatedPayLoadData);
      let flag = true;
      getClaimDetails(updatedPayLoadData, flag);
      setClearBtnDisable(false);
      setSearchBtnDisable(false);
      setValue("nameDob");
    }
  }, []);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const handleRadioChange = (event) => {
    if (value != event.target.value) {
      setValue(event.target.value);
      const claimSearchedBy = claimsInputData.filter((inputItem) => {
        return inputItem.searchBy === event.target.value;
      });
      setClaimsInputData(claimSearchedBy);
      checkInput(claimSearchedBy);
      sectionChange();
    }
  };

  const sectionChange = () => {
    setClaimsFormData({
      ...claimsFormData,
      claimNumber: "",
      firstName: "",
      memeberId: "",
      medicaidId: "",
      patientrSsn: "",
      lastName: "",
      dob: "",
      beginDate: "",
      endDate: "",
      checkNumber: "",
    });
    setClearBtnDisable(true);
    setSearchBtnDisable(true);
    setShowEndDateNote(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    claimsData.forEach((inputData) => {
      if (inputData.id === "claimNumber") {
        setTextareaValue(inputData.value);
      }
    });
  };

  const handleClick = () => {
    console.log("Hi");
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }

  const handleClaimDialog = () => {
    setClaimsFormData({
      ...claimsFormData,
      claimNumber: textareaValue.replace(/\s/g, ""),
    });
    setClaimsInputData(
      claimsData.map((inputData) => {
        if (inputData.id === "claimNumber") {
          return {
            ...inputData,
            value: textareaValue,
          };
        } else {
          return {
            ...inputData,
          };
        }
      })
    );
    if (textareaValue && textareaValue.length > 0) {
      setSearchBtnDisable(false);
      setClearBtnDisable(false);
    } else {
      setSearchBtnDisable(true);
      setClearBtnDisable(true);
    }
    setOpen(false);
    setTimeout(() => {
      checkInput(claimsData);
    }, 100);
  };

  const handleChange = (event) => {
    let onChangeInputFieldsData = {
      ...claimsFormData,
      [event.target.name]: event.target.value,
    };
    setClaimsFormData({
      ...claimsFormData,
      [event.target.name]: event.target.value.replace(/\s/g, ""),
    });
    const updateClaimsData = claimsData.map((inputData) => {
      if (inputData.id === event.target.id) {
        return {
          ...inputData,
          value:
            event.target.id === "endDate" || event.target.id === "beginDate"
              ? updateDate(onChangeInputFieldsData, event)
              : event.target.value.replace(/\s/g, ""),
        };
      } else {
        return {
          ...inputData,
        };
      }
    });
    setClaimsInputData(updateClaimsData);
    checkInput(updateClaimsData);
  };

  const updateDate = (onChangeInputFieldsData, event) => {
    if (
      onChangeInputFieldsData.endDate.length > 0 &&
      onChangeInputFieldsData.beginDate.length > 0
    ) {
      if (
        new Date(onChangeInputFieldsData.endDate).getTime() >=
        new Date(onChangeInputFieldsData.beginDate).getTime()
      ) {
        setShowEndDateNote(false);
        setSearchBtnDisable(false);
      } else {
        setSearchBtnDisable(true);
        setShowEndDateNote(true);
      }
    } else {
      setSearchBtnDisable(true);
      setShowEndDateNote(false);
    }
  };

  const checkInput = (updateClaimsData) => {
    if (value === "nameDob") {
      const claimButtons = updateClaimsData.some((checkInput) => {
        return checkInput.value && checkInput.value.length > 0;
      });
      if (claimButtons) {
        setSearchBtnDisable(false);
        setClearBtnDisable(false);
      } else {
        setSearchBtnDisable(true);
        const clearButton = updateClaimsData.some((checkInput) => {
          return checkInput.value && checkInput.value.length > 0;
        });

        if (clearButton) {
          setClearBtnDisable(false);
        } else {
          setClearBtnDisable(true);
        }
      }
    } else if (value === "Claims") {
      updateClaimsData.forEach((checkInput) => {
        if (
          checkInput.id === "claimNumber" ||
          checkInput.id === "checkNumber" ||
          checkInput.id === "beginDate" ||
          checkInput.id === "endDate"
        ) {
          if (
            (document.getElementById("claimNumber") &&
              document.getElementById("claimNumber").value.length > 0) ||
            (document.getElementById("checkNumber") &&
              document.getElementById("checkNumber").value.length > 0)
          ) {
            if (
              document.getElementById("beginDate") &&
              document.getElementById("beginDate").value.length > 0 &&
              document.getElementById("endDate") &&
              document.getElementById("endDate").value.length === 0
            ) {
              setSearchBtnDisable(true);
              setClearBtnDisable(false);
            } else if (
              document.getElementById("beginDate") &&
              document.getElementById("beginDate").value.length === 0 &&
              document.getElementById("endDate") &&
              document.getElementById("endDate").value.length > 0
            ) {
              setSearchBtnDisable(true);
              setClearBtnDisable(true);
              document.getElementById("endDate").value = "";
            } else if (
              document.getElementById("beginDate") &&
              document.getElementById("beginDate").value.length > 0 &&
              document.getElementById("endDate") &&
              document.getElementById("endDate").value.length > 0
            ) {
              setSearchBtnDisable(false);
              setClearBtnDisable(false);
            } else {
              setSearchBtnDisable(false);
              setClearBtnDisable(false);
            }
          } else if (
            document.getElementById("beginDate") &&
            document.getElementById("beginDate").value.length > 0 &&
            document.getElementById("endDate") &&
            document.getElementById("endDate").value.length > 0
          ) {
            setSearchBtnDisable(false);
            setClearBtnDisable(false);
          } else if (
            document.getElementById("beginDate") &&
            document.getElementById("beginDate").value.length > 0 &&
            document.getElementById("endDate") &&
            document.getElementById("endDate").value.length === 0
          ) {
            setSearchBtnDisable(true);
            setClearBtnDisable(false);
          } else if (
            document.getElementById("beginDate") &&
            document.getElementById("beginDate").value.length === 0 &&
            document.getElementById("endDate") &&
            document.getElementById("endDate").value.length > 0
          ) {
            setSearchBtnDisable(true);
            setClearBtnDisable(true);
            document.getElementById("endDate").value = "";
          } else {
            setSearchBtnDisable(true);
            setClearBtnDisable(true);
          }
        } else {
          setSearchBtnDisable(true);
          setClearBtnDisable(true);
        }
      });
    } else {
      const memeberIdButtons = updateClaimsData.some((checkInput) => {
        return checkInput.value && checkInput.value.length > 0;
      });
      if (memeberIdButtons) {
        setSearchBtnDisable(false);
        setClearBtnDisable(false);
      } else {
        setSearchBtnDisable(true);
        setClearBtnDisable(true);
      }
    }
  };

  const handleTextareaChange = (event) => {
    setTextareaValue(event.target.value.replace(/\s/g, ""));
  };

  const handleClearAll = () => {
    setShowTable(false);
    setSearchBtnDisable(true);
    setClearBtnDisable(true);
    setShowEndDateNote(false);
    setTextareaValue("");
    setData([]);
    claimsData.forEach((inputData) => {
      document.getElementById(inputData.id).value = "";
    });

    setClaimsInputData(
      claimsData.map((inputItem) => {
        return {
          ...inputItem,
          value: "",
        };
      })
    );
    setClaimsFormData({
      ...claimsFormData,
      claimNumber: "",
      firstName: "",
      memeberId: "",
      medicaidId: "",
      patientrSsn: "",
      lastName: "",
      dob: "",
      beginDate: "",
      endDate: "",
      checkNumber: "",
    });
  };

  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleButtonSearch = (event) => {
    console.log("hi");
    //setShowTable(true);
    setSearchDialogOpen(true);
    if (event.target.innerText === "Clear All") {
      handleClearAll();
    } else if (
      event.target.innerText === "Search" ||
      (event.keyCode == 13 && event.key === "Enter")
    ) {
      getClaimDetails(claimsFormData);
    } else {
    }
  };

  const handleSearchDialog = () => {
    setSearchDialogOpen(false);
  }

  const getClaimDetails = (claimsFormData, flag) => {
    let filter_obj;
    if (flag) {
      filter_obj = {
        ClaimNumber: claimsFormData.claimNumber,
        MemberId: claimsFormData.memberId,
        FirstName: claimsFormData.firstName,
        LastName: claimsFormData.lastName,
        DOB: claimsFormData.dob ? claimsFormData.dob.replaceAll("-", "") : "",
        Prov_tin: taxIdVal.current.length > 0 ? taxIdVal.current : "",
        Prov_npi: npi.current.length > 0 ? npi.current : "",
      };
    } else {
      filter_obj = {
        ClaimNumber:
          value === "Claims" && claimsFormData.claimNumber
            ? claimsFormData.claimNumber
            : "",
        MemberId:
          value === "Member" && claimsFormData.memberId
            ? claimsFormData.memberId
            : "",
        FirstName:
          value === "nameDob" && claimsFormData.firstName
            ? claimsFormData.firstName
            : "",
        LastName:
          value === "nameDob" && claimsFormData.lastName
            ? claimsFormData.lastName
            : "",
        DOB:
          value === "nameDob" && claimsFormData.dob
            ? claimsFormData.dob.replaceAll("-", "")
            : "",
        // Prov_tin: taxIdVal.current.length > 0 ? taxIdVal.current : "",
        // Prov_npi: npi.current.length > 0 ? npi.current : "",
      };
    }
    if (!searchBtnDisable || flag) {
      setShowTable(true);
      setLoading(true);
      requestWrapper(serviceUrls.getClaimDetails, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        data: {
          UserProfile: {
            userName: "",
            userRoles: [],
            UserAttributes: [],
          },
          filter: filter_obj,
          offset: 0,
          limit: 50,
        },
      })
        .then((response) => {
          setLoading(false);
          if (response.status == "fail") {
            if (response.message === "No Data Found") {
              setNoData("No Data Found");
            } else {
              setNoData("Internal Error");
              setSnackSev("error");
              setSnackMsg("Internal Error");
              setSnackOpen(true);
            }
            setData([]);

            setLoading(false);
          } else {
            setLoading(false);
            let cloneResponseData = JSON.parse(
              JSON.stringify(response.GetClaimDetails)
            );
            const formattedData =
              cloneResponseData.length > 0 &&
              cloneResponseData.map((item) => {
                return {
                  ...item,
                  Total_Charge:
                    item &&
                    item.Total_Amount_Values &&
                    item.Total_Amount_Values[0].Total_Charge &&
                    item.Total_Amount_Values[0].Total_Charge,
                  Paid_Amount:
                    item &&
                    item.Total_Amount_Values &&
                    item.Total_Amount_Values[0].Paid_Amount &&
                    item.Total_Amount_Values[0].Paid_Amount,
                };
              });
            setData(formattedData);
          }
        })
        .catch((error) => {
          setLoading(false);
          setNoData("Internal Error");
          setSnackSev("error");
          setSnackMsg("Internal Error");
          setSnackOpen(true);
        });
    }
  };

  const AdvancedSearch = (() => {
    setDialogOpen(true)
  })

  const LightTooltip = withStyles((theme) => ({
    arrow: {
      color: "#D9D9D9",
      marginLeft: "3rem",
    },
    tooltip: {
      backgroundColor: "white",
      color: "grey",
      boxShadow: theme.shadows[1],
      fontSize: "0.7rem",
      width: "14rem",
      height: "2.rem",
      fontWeight: 400,
      textAlign: "center",
      marginBottom: "0rem",
      border: "1px solid grey",
    },
  }))(Tooltip);

  return (
    <React.Fragment>
      <Paper elevation={6} variant="outlined" className={classes.paper}>
        <Grid container className={classes.searchHeader}>
          <Grid item xs={12}>
            <Typography>Search By</Typography>
          </Grid>
        </Grid>
        <Grid container style={{ paddingLeft: "1.8rem" }}>
          <RadioButton
            inputData={radioclaimsData}
            radioVal={value}
            handleRadioBtnSearch={handleRadioChange}
            accessibilityFontSize={accessibilityFontSize}
          />
        </Grid>

        <Grid container className={classes.MemberSearchSection} direction="row">
          <Grid container direction="row" className={classes.memberInput}>
            <Grid container direction="row" spacing={2}>
              {claimsData && claimsData.length > 0
                ? claimsData.map((data) => {
                  return (
                    <Grid
                      item
                      xl={2}
                      lg={2}
                      md={3}
                      sm={6}
                      xs={12}
                      key={data.id}
                    >
                      <div className={classes.helpIcon}>
                        <label
                        >
                          {data.label}
                        </label>
                        {data.title ? (
                          <LightTooltip
                            placement="top-start"
                            title={
                              <span
                              >
                                {data.title}
                              </span>
                            }
                          >
                            <HelpOutlineOutlinedIcon
                              className={classes.helpOutLineIcon}
                            />
                          </LightTooltip>
                        ) : (
                          ""
                        )}
                      </div>

                      {data.inputType === "text" ||
                        data.inputType === "search" ? (
                        <React.Fragment>
                          <TextField
                            size="small"
                            id={data.id}
                            placeholder={data.placeHolder}
                            type={data.inputType}
                            variant="outlined"
                            value={data.value}
                            className={data.className}
                            onKeyDown={handleButtonSearch}
                            name={data.name}
                            onChange={handleChange}
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <TextField
                            size="small"
                            id={data.id}
                            format={data.format}
                            placeholder={data.placeHolder}
                            type={data.inputType}
                            variant="outlined"
                            onChange={handleChange}
                            onKeyDown={handleButtonSearch}
                            name={data.name}
                            value={data.value}
                            className={data.className ? data.className : ""}
                            disabled={
                              data.checkRange &&
                                claimsFormData.beginDate === ""
                                ? true
                                : false
                            }
                            inputProps={{
                              min:
                                claimsFormData.beginDate && data.checkRange
                                  ? new Date(claimsFormData.beginDate)
                                    .toISOString()
                                    .split("T")[0]
                                  : "",
                            }}
                            helperText={
                              data.helperTextFlag ? data.helperText : ""
                            }
                          />
                          {data.checkRange && showEndDateNote ? (
                            <div className={classes.endDateNoteInfo}>
                              <span class="material-symbols-outlined">
                                warning
                                </span>{" "}
                              <label
                              >
                                {data.title}
                              </label>
                            </div>
                          ) : (
                            ""
                          )}
                        </React.Fragment>
                      )}
                    </Grid>
                    
                  );
                })
                : null}
              <Grid
                item
                xl={3}
                lg={3}
                md={6}
                sm={6}
                xs={12}
                className={classes.buttonFields}
              >
                <label
                  style={{
                    visibility: "hidden",}}
                >
                  Search Button
                </label>
                {/* hiding the above label for alignment when accessibility increase the font size dont remove it */}
                <SearchButton
                  buttonData={searchButtons}
                  // searchBtnDisable={searchBtnDisable}
                  // clearBtnDisable={clearBtnDisable}
                  handleButton={handleButtonSearch}
                // accessibilityFontSize={accessibilityFontSize}
                onClick={handleClick}
                />
              </Grid>
            </Grid>

            {value == 'nameDob' && <Grid container className={classes.adSearchheader1}>
              <p onClick={AdvancedSearch}>Advanced Member Search</p>
            </Grid>}
            {value != 'nameDob' && <Grid container className={classes.adSearchheader2}>
              <Grid item xl={2}  lg={2}  md={3} sm={6} xs={12}></Grid>
              <Grid item xl={10} lg={10} md={9} sm={6} xs={12}><p onClick={AdvancedSearch}>Advanced Member Search</p></Grid>
           </Grid>}

            {dialogOpen && <MemberSearchDialog handleCloseDialog={handleCloseDialog} />}
          </Grid>
        </Grid>
      </Paper>
      {searchDialogOpen && <SearchDialog handleSearchDialog={handleSearchDialog} />}
      <Grid container style={{ paddingTop: '1rem' }}>
        <Grid xs={12}>
          {showTable && <Paper elevation={6} variant="outlined" className={classes.paper}>
            <Grid xs={12}>
              <MemberTable />
            </Grid>
          </Paper>}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default MemberSearch;
