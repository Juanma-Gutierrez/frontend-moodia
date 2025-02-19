import React, { useEffect, useState } from "react";
import ReactEcharts from "echarts-for-react";
import { CONSTANTS } from "@constants/Constants";

/**
 * AreaChart component for displaying a line area chart based on posts data
 * @param {Array} posts - Array of posts with score and creation date.
 * @param {Array} colors - Array of colors to use for the chart's series.
 * @returns {JSX.Element} - Returns a ReactEcharts component rendering the area chart.
 */
export default function AreaChart({ posts, colors }) {
  const [dataset, setDataset] = useState({ xAxisData: [], seriesData: [] });
  const leyend = CONSTANTS.SCORE_GLOBAL;

  /**
   * Effect hook to process posts data and prepare it for chart rendering
   * @returns {void} - Updates the dataset state with the formatted dates and series data.
   */
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

    /**
   * Configuration object for the ECharts area chart
   * @returns {Object} - The option object used to configure the chart.
   */
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
      bottom: 10,
      orient: "horizontal",
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "18%",
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

  return <ReactEcharts option={option} />;
}
