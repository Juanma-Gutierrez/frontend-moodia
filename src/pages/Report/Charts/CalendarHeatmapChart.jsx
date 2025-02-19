import * as echarts from "echarts";
import React, { useEffect, useRef } from "react";
import { CONSTANTS } from "@constants/Constants";

/**
 * CalendarHeatmap component for rendering a calendar heatmap based on posts data
 * @param {Array} posts - Array of posts containing the creation date and score data to be processed.
 * @returns {JSX.Element} - Returns a div element with the calendar heatmap rendered using ECharts.
 */
export default function CalendarHeatmap({ posts }) {
  const chartRef = useRef(null);

  /**
   * Effect hook for initializing the ECharts calendar heatmap chart and updating it when posts data changes
   * @returns {void} - Initializes and disposes of the ECharts chart on post data change.
   */
  useEffect(() => {
    if (!chartRef.current || !posts.length) return;
    const chart = echarts.init(chartRef.current);

    const data = posts.map((post) => [post.created_at.split("T")[0], post.score]);

    const option = {
      title: {
        top: 0,
        left: "left",
        text: "Historial",
      },
      tooltip: {},
      visualMap: {
        min: 0,
        max: 5000,
        type: "piecewise",
        orient: "horizontal",
        left: "center",
        top: 50,
        pieces: [
          { min: 1, max: 2, label: CONSTANTS.SCORE.SCORE1, color: CONSTANTS.COLORS.COLOR1 },
          { min: 2, max: 3, label: CONSTANTS.SCORE.SCORE2, color: CONSTANTS.COLORS.COLOR2 },
          { min: 3, max: 4, label: CONSTANTS.SCORE.SCORE3, color: CONSTANTS.COLORS.COLOR3 },
          { min: 4, max: 5, label: CONSTANTS.SCORE.SCORE4, color: CONSTANTS.COLORS.COLOR4 },
          { min: 5, label: CONSTANTS.SCORE.SCORE5, color: CONSTANTS.COLORS.COLOR5 },
        ],
      },
      calendar: {
        top: 120,
        left: 30,
        right: 30,
        cellSize: ["auto", 13],
        range: new Date().getFullYear().toString(),
        itemStyle: {
          borderWidth: 0.2,
        },
        yearLabel: { show: false },
        dayLabel: {
          nameMap: CONSTANTS.DATE.DAY_OF_WEEK_D,
        },
        monthLabel: {
          nameMap: CONSTANTS.DATE.MONTHS_MMM,
        },
      },
      series: {
        type: "heatmap",
        coordinateSystem: "calendar",
        data,
      },
    };

    chart.setOption(option);
    return () => chart.dispose();
  }, [posts]);

  return <div ref={chartRef} style={{ width: CONSTANTS.CHARTS.WIDTH, height: CONSTANTS.CHARTS.HEIGHT }} />;
}
