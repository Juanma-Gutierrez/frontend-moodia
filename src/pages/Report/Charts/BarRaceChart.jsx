import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { CONSTANTS } from "@constants/Constants";

export default function BarRaceChart({ posts }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !posts.length) return;
    const chart = echarts.init(chartRef.current);

    const categoryScores = {};
    const categoryCounts = {};

    posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (!categoryScores[category.name]) {
          categoryScores[category.name] = 0;
          categoryCounts[category.name] = 0;
        }
        categoryScores[category.name] += post.score;
        categoryCounts[category.name] += 1;
      });
    });

    const sortedCategories = Object.entries(categoryScores)
      .map(([name, totalScore]) => ({
        name,
        averageScore: totalScore / categoryCounts[name],
      }))
      .sort((a, b) => b.averageScore - a.averageScore);

    const option = {
      title: {
        text: "Promedio",
        left: "left",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params) {
          const category = params[0].name;
          const averageScore = params[0].value.toFixed(1);
          return `${category}: ${averageScore}`;
        },
      },
      grid: {
        top: 50,
        bottom: 30,
        left: 70,
        right: 50,
      },
      xAxis: {
        type: "value",
        max: "dataMax",
      },
      yAxis: {
        type: "category",
        data: sortedCategories.map((item) => item.name),
        inverse: true,
      },
      series: [
        {
          type: "bar",
          data: sortedCategories.map((item) => item.averageScore),
          label: {
            show: false,
          },
          itemStyle: {
            color: CONSTANTS.COLORS.COLOR4,
          },
        },
      ],
      animationDuration: 1000,
      animationDurationUpdate: 1000,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, [posts]);

  return <div ref={chartRef} style={{ width: CONSTANTS.CHARTS.WIDTH, height: CONSTANTS.CHARTS.HEIGHT }} />;
}
