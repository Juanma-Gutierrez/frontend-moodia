// AreaChart.jsx
import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";

const AreaChart = ({ posts, colors }) => {
  const [dataset, setDataset] = useState({ xAxisData: [], seriesData: [] });

  const leyend = ["Muy mal", "Mal", "Normal", "Bien", "Muy bien"];

  // Procesamos los posts al recibirlos como props
  useEffect(() => {
    const postsByDate = {};

    posts.forEach((post) => {
      const date = new Date(post.created_at).toISOString().split("T")[0];
      if (!postsByDate[date]) {
        postsByDate[date] = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        };
      }
      postsByDate[date][post.score] += post.score;
    });

    const sortedDates = Object.keys(postsByDate).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    const seriesData = [[], [], [], [], []];

    sortedDates.forEach((date) => {
      const scores = postsByDate[date];
      seriesData[0].push(scores[1]);
      seriesData[1].push(scores[2]);
      seriesData[2].push(scores[3]);
      seriesData[3].push(scores[4]);
      seriesData[4].push(scores[5]);
    });

    const formattedDates = sortedDates.map((date) => {
      return new Date(date).toLocaleDateString();
    });

    setDataset({ xAxisData: formattedDates, seriesData });
  }, [posts]);

  const option = {
    color: colors,
    title: {
      text: "Por días",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: leyend,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dataset.xAxisData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: dataset.seriesData.map((data, index) => ({
      name: leyend[index],
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: colors[index % colors.length],
      },
      emphasis: {
        focus: "series",
      },
      data: data,
    })),
  };

  return <ReactEcharts option={option}  />;
};

export default AreaChart;
