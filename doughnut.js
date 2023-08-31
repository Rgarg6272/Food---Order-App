import { Doughnut } from "react-chartjs-2";
import {
  Grid,
  Container,
  makeStyles,
  Card,
  TextField,
  Typography,
} from "@material-ui/core";
// import { inquiriesStyles } from "../../css/InquiriesCss";
const useStyles = makeStyles((theme) => ({
  DoughnutChartWidth: {
    width: "50%",
    [theme.breakpoints.down(2100)]: {
      width: "50%", //67%
    },

    [theme.breakpoints.down("lg")]: {
      width: "60%", //75%
    },

    [theme.breakpoints.down(1750)]: {
      width: "65%", //80%
    },

    [theme.breakpoints.down(1550)]: {
      width: "75%", //90%
    },

    [theme.breakpoints.down(1400)]: {
      width: "75%",
    },
    [theme.breakpoints.down("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
}));
export const DoughnutChart = ({
  title,
  legendPos,
  legendDis,
  cutout,
  width,
  height,
  count,
  countPosY,
  totalPosY,
  chartConfig,
}) => {
  const classes = useStyles();

  let fontSize = 1;
  let donutX;
  let donutY = 0;
  let cFontWeight = 800;

  if (title && title.includes("DAILY")) {
    fontSize = (height / 200).toFixed(2);
    donutX = "DAILY";
    donutY = 0.5 * height;
    cFontWeight = 500;
  } else if (title && title.includes("STAGE")) {
    fontSize = (height / 300).toFixed(2);
    donutX = "STAGING";
    donutY = 0.59 * height;
    cFontWeight = 400;
  } else if (title && title.includes("RESPONSIBILITY")) {
    fontSize = (height / 250).toFixed(2);
    donutX = "RESPONSIBILITY";
    donutY = 0.57 * height;
    cFontWeight = 400;
  } else {
    fontSize = (height / 170).toFixed(2);
    donutX = "DEFAULT";
    donutY = 0.5 * height;
    cFontWeight = 800;
  }

  return (
    <div
      className={classes.DoughnutChartWidth}
      //   style={{ width: "35%" }}
    >
      <Doughnut
        data={chartConfig}
        options={{
          cutout: "60%",
          radius: "100%",
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: title ? true : false,
              text: title,
              textAlign: "left",
            },
            legend: {
              labels: {
                usePointStyle: true,
                boxWidth: 9,
              },
              display: false,
              // position: legendPos
            },
          },
        }}
        plugins={[
          {
            beforeDraw: function (chart) {
              const width = chart.width,
                //height = chart.height
              ctx = chart.ctx;
              ctx.restore();
              ctx.font = 1.3+ `em sans-serif`;
              ctx.textAlign = "center";
              ctx.textBaseLine = "center";
              ctx.fillStyle = "#2c2b2c";
              ctx.fontWeight = 700;

              // Calculate text position

              const textX = Math.round(width / 2);
              const textY = donutY - totalPosY;
              //const textY = Math.round(height / 2);
              const countTextX = count ? textY + 50 + countPosY : textY;
              const countTextY = count ? textY + 100 + countPosY : textY;
              // Draw the text
              ctx.fillText("All Inquiries", textX, textY);
              ctx.fontWeight = cFontWeight;
             //ctx.fillText(count, textX, countTextY, countTextX);
              ctx.fillText(count, textX, countTextX, countTextY);
              ctx.save();
            },
          },
        ]}
      />
    </div>
  );
};
