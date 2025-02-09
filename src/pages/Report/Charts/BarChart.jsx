// BarChart.jsx
import React from "react";
import ReactEcharts from "echarts-for-react";

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
