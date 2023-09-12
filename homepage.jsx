import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Tabs,
  Tab,
  Container,
  Divider,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
  Paper
} from "@material-ui/core";
import { useStyles } from "../../css/MemberDetails";
import { makeStyles, withStyles } from '@material-ui/styles';
import { COMMONCSS } from "../../css/CommonCss";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ImportContactsOutlinedIcon from '@material-ui/icons/ImportContactsOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { HomePageDetails } from '../../../constants/memberData';
import { homePageStyles } from "../../css/HomePageStyles";

const useStyles1 = makeStyles((theme) => COMMONCSS(theme));
export const HomePage = (props) => {
  const classes = useStyles();
  const classes1 = useStyles1();
  const classes2 = homePageStyles();
  const [value, setValue] = useState(location.dashboardTab ? "three" : "two");
  const [homePageDetails, setHomePageDetails] = useState(false);
  const [tableRowData, setTableRowData] = useState([]);
  const [searchData, setSearchedData] = useState({});

  const handleTableData = (value) => {
    setTableRowData(value);
  };

  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "one") {
      history.push("/");
    } else if (newValue === "two") {
      if (location.dashboardTab) { history.push("/dashboard") }
      else {
        history.push("/carePlan")
      }
    }
  };

  const handleSearchPage = (data) => {
    setSearchedData(data);
  };

 

  const handleClickN = (() =>{
    history.push("/MemberDetails");
  })


  useEffect(() => {

  });

  return (
    <React.Fragment>
      <div style={{ padding: "1.5rem 4% 3% 4%" }}>
        <Paper elevation={0} variant="outlined" className={classes.paper} style={{ padding: "1rem" }}>
          <Grid container style={{padding:'0.8rem',cursor:"pointer"}} onClick={handleClickN}>
          {HomePageDetails && HomePageDetails.length > 0
            ? HomePageDetails.map((data) => {
              return (
                <Grid item xs={12} style={{padding : data.id !== 1 ? "0.8rem" : "0 0.8rem 0.8rem 0.8rem"}}>
                  <Grid container className={classes2.gridItem}>
                    <Grid item xl={1} lg={1} md={1} sm={2} xs={2} className={classes2.imgStyle} >
                      <img src={data.path} className={classes2.logoStyle}  />
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={8} xs={8} className={classes2.labelStyle} >
                       {data.label}
                    </Grid>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2} className={classes2.arrowIcon} >
                      <ArrowForwardIosOutlinedIcon />
                    </Grid>
                  </Grid>
                </Grid>
              )}) : ""}
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
};
export default HomePage;
