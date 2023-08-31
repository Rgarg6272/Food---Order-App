Chart.pluginService.register({
    beforeDraw: function (chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        var text = chart.config.options.elements.center.text,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
    }
});


// chart1
var data = {
    labels: ["Red", "Blue"],
    datasets: [{
        data: [75, 25],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"]
    }]
};
var promisedDeliveryChart = new Chart(document.getElementById('myChart2'), {
    type: 'doughnut',
    data: data,
    options: {
        elements: {
            center: {
                text: '75%'  //set as you wish
            }
        },
        cutoutPercentage: 75,
        legend: {
            display: false
        }
    }
});
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
<table>
    <tr>
        <td><canvas id="myChart2" width="150" height="150"></canvas></td>
    </tr>
<table>
