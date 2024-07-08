export default {
  chart: {
    height: 400,
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  series: [],
  tooltip: {
    shared: true,
    custom: [
      function ({ seriesIndex, dataPointIndex, w }: any) {
        return w.globals.series[seriesIndex][dataPointIndex];
      },
      function ({ seriesIndex, dataPointIndex, w }: any) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-candlestick text-black p-2">' +
          '<div>Open: <span class="value">' +
          o +
          "</span></div>" +
          '<div>High: <span class="value">' +
          h +
          "</span></div>" +
          '<div>Low: <span class="value">' +
          l +
          "</span></div>" +
          '<div>Close: <span class="value">' +
          c +
          "</span></div>" +
          "</div>"
        );
      },
    ],
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 1],
  },
  grid: {
    show: true,
    strokeDashArray: 4,
    padding: {
      left: 2,
      right: 2,
      top: -26,
    },
    borderColor: "#90a4ae2f",
  },
  legend: {
    show: false,
  },
  xaxis: {
    type: "datetime",
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    labels: {
      show: true,
      style: {
        fontFamily: "Inter, sans-serif",
        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
      },
      formatter: function (value: number) {
        return "$" + value;
      },
    },
  },
};
