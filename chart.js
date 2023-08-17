import { Doughnut } from 'react-chartjs-2';

export const DoughnutChart = ({ title, legendPos, legendDis, cutout, width, height, count, countPosY, totalPosY, chartConfig }) => {
    let fontSize = 1;
    let donutX;
    let donutY = 0;
    let cFontWeight = 500;

    if (title && title.includes("DAILY")) {
        fontSize = (height / 200).toFixed(2);
        donutX = "DAILY";
        donutY = 0.5 * height;;
        cFontWeight = 500;

    }
    else if (title && title.includes("STAGE")) {
        fontSize = (height / 300).toFixed(2);
        donutX = "STAGING"
        donutY = 0.59 * height;
        cFontWeight = 400;
    }
    else if (title && title.includes("RESPONSIBILITY")) {
        fontSize = (height / 250).toFixed(2);
        donutX = "RESPONSIBILITY";
        donutY = 0.57 * height;
        cFontWeight = 400;;
    }
    else {
        fontSize = (height / 170).toFixed(2);
        donutX = "DEFAULT";
        donutY = 0.5 * height;
        cFontWeight = 500;;
    }


    return (
        <div style={{width: '35%' }}>
            <Doughnut
                data={chartConfig}
                options={{
                    cutout: "70%",
                    radius: "97%",
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        title: {
                            display: title ? true : false,
                            text: title,
                            textAlign: 'left',
                        },
                        legend: {
                            labels: {
                                usePointStyle: true,
                                boxWidth: 9
                            },
                            display: false,
                            // position: legendPos
                        }
                    }
                }}
                plugins={[{
                    beforeDraw: function (chart) {
                        const width = chart.width,
                            //height = chart.height
                            ctx = chart.ctx;
                        ctx.restore();
                        ctx.font = fontSize + "em sans-serif";
                        ctx.textAlign = "center";
                        ctx.textBaseLine = "middle";
                        const text = count,
                            textX = Math.round((width - ctx.measureText(text).width) / 2),
                            textY = donutY;
                        count ? ctx.fillText("Total", textX, textY - totalPosY) : ctx.fillText("No Data", textX - totalPosY, textY - totalPosY);
                        ctx.fontWeight = cFontWeight;
                        ctx.fillText(text, textX, textY - countPosY);
                        ctx.save();
                    }
                }]
                }
            />
         </div>
    )
}



