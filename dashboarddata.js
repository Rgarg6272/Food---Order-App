import React, { useState } from "react";
import {
  Grid,
  Container,
  makeStyles,
  Card,
  TextField,
  Typography,
} from "@material-ui/core";
import { inquiriesStyles } from "../../../css/InquiriesCss";
import { commonFontSizes } from "../../../css/FontSizes";
import {
  donutChartData,
  InquiriesData,
  InquiriesProcessorLegend,
} from "../../../../constants/inquiriesData";
import { DoughnutChart } from "../../../common/charts/DoghnutChart";
import { useEffect } from "react";

import StopIcon from "@material-ui/icons/Stop";
const useStyles = makeStyles((theme) => inquiriesStyles(theme));
const useStyles2 = makeStyles((theme) => ({
  DoughnutChartHeight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",

    [theme.breakpoints.down(2100)]: {
      height: "300px", //67%
    },

    [theme.breakpoints.down("lg")]: {
      height: "300px", //75%
    },

    [theme.breakpoints.down(1750)]: {
      height: "300px",//80%
    },

    [theme.breakpoints.down(1550)]: {
      height: "300px", //90%
    },

    [theme.breakpoints.down(1400)]: {
      height: "300px",
    },
    [theme.breakpoints.down('md')]: {

      height: "400px",

    }

  },
}));
export const InquiryDashboardData = (props) => {
  const { inquriesData } = props;
  const [newCount, setNew] = useState(
    inquriesData ? inquriesData.New_Inquiries_count : ""
  );
  const [resolved, setResolved] = useState(
    inquriesData ? inquriesData.Resloved_Inquiries_count : ""
  );
  const [inprogress, setInprogress] = useState(
    inquriesData ? inquriesData.Inprogress_Inquiries_count : ""
  );
  const [all, setAll] = useState(
    inquriesData ? inquriesData.All_Inquiries_count : ""
  );
  const [date, setDate] = useState(
    inquriesData ? inquriesData.User_Login_Date : ""
  );
  const classes = useStyles();
  const classes2 = useStyles2();
  const [donutChartData, setDonutChartData] = useState({
    labels: [],
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setNew(inquriesData ? inquriesData.New_Inquiries_count : "");
    setResolved(inquriesData ? inquriesData.Resloved_Inquiries_count : "");
    setInprogress(inquriesData ? inquriesData.Inprogress_Inquiries_count : "");
    setAll(inquriesData ? inquriesData.All_Inquiries_count : "");
    setDate(inquriesData ? inquriesData.User_Login_Date : "");
  }, [inquriesData]);

  const data = {
    labels: ["New", "Resolved", "Inprogress"],
    datasets: [
      {
        label: "# of Votes",
        data: [newCount, resolved, inprogress],
        backgroundColor: ["#E18210", "#29A1C6", "#A71930"],
        // cutout:'90%'
      },
    ],
  };

  const config = {
    type: "doughnut",
    data,

    // plugins : [doughnutLabelsLine]
  };
  const options = {
    type: "outlabeledDoughnut",
    responsive: true,
    maintainAspectRatio: true,
    // elements: {
    //   center: {
    //     text: "平均年齢",
    //     color: "#FF6384",
    //     fontStyle: "Arial",
    //     sidePadding: 0,
    //     minFontSize: 15,
    //     lineHeight: 15
    //   }
    // },
    // plugins: {
    //   legend: true,
    //   outlabels: {
    //     text: "%p\n%v万人",
    //     color: "white",
    //     stretch: 40,
    //     font: {
    //       resizable: true,
    //       minSize: 10,
    //       maxSize: 12
    //     }
    //   }
    // },
    tooltips: {
      enabled: true,
    },
  };

  const handleDate = () => {
    const today = new Date();
    return today;
  };
  return (
    <Container className={classes.inquiryDataDashboard}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "right",
            paddingRight: "20px",
          }}
        >
          <Typography style={{ fontSize: "0.875rem", color: "#000000", paddingTop: '1%' }}>
            Status shown as on today
          </Typography>
        </Grid>
        {/* <span style={{ fontSize: "0.875rem", color: "#000000", display: 'flex', justifyContent: "right", width: '100%' }}>Status shown as on today</span> */}
        {all && (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div style={{ width: '20%', marginLeft: '20px' }}>
              {InquiriesProcessorLegend.map((item) => (
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginRight: '1rem' }}>
                  <p>{item.label}</p>
                  <StopIcon
                    style={{ color: item.color, verticalAlign: "middle" }}
                  />
                  <p>{item.id === "New" ? newCount : item.id === "Inprogress" ? inprogress : resolved}</p>
                </div>
              ))}
            </div>
            <div style={{ width: '80%' }} className={classes2.DoughnutChartHeight}>
              <DoughnutChart
                count={all}
                legendDis={false}
                cutout={6}
                width={400}
                height={250}
                countPosY={-70}
                totalPosY={0}
                countPosX={0}
                totalPosX={40}
                chartConfig={data}
              />
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
export default InquiryDashboardData;
