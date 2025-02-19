import React from "react";
import ReactEcharts from "echarts-for-react";

/**
 * BarChart component for displaying a bar chart with post states data
 * @param {Object} dataset - Object containing xAxisData (categories) and seriesData (values).
 * @param {Array} colorsSet - Array of colors to be used for the bar chart.
 * @returns {JSX.Element} - Returns a ReactEcharts component rendering the bar chart.
 */
export default function BarChart({ dataset, colorsSet }) {
  const barchar = {
    title: {
      text: "Promedio",
    },
    tooltip: {},
    xAxis: {
      data: dataset.xAxisData,
    },
    yAxis: {},
    series: [
      {
        name: "Posts por estado",
        type: "bar",
        data: dataset.seriesData,
        itemStyle: {
          color: function (params) {
            const colors = colorsSet;
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  return <ReactEcharts option={barchar} />;
}
