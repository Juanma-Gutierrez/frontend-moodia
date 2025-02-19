import { useEffect, useState } from "react";
import { CONSTANTS } from "@constants/Constants";

/**
 * BarChartData component for calculating dataset from posts to be used in a bar chart
 * @param {Array} posts - Array of posts containing score data to be processed.
 * @returns {Object} - Returns an object with xAxisData (score labels) and seriesData (score counts).
 */
export default function BarChartData({ posts }) {
  const [barcharDataset, setBarcharDataset] = useState({ xAxisData: [], seriesData: [] });

  /**
   * Effect hook to calculate and set the bar chart dataset based on posts data
   * @returns {void} - Triggers calculation of the dataset when posts data changes.
   */
  useEffect(() => {
    calculateBarcharDataset();
  }, [posts]);

  /**
   * Function to calculate the bar chart dataset from posts' scores
   * @returns {void} - Updates the barcharDataset state with xAxisData and seriesData.
   */
  const calculateBarcharDataset = () => {
    const scoreCount = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    const scoreLabels = {
      1: CONSTANTS.SCORE.SCORE1,
      2: CONSTANTS.SCORE.SCORE2,
      3: CONSTANTS.SCORE.SCORE3,
      4: CONSTANTS.SCORE.SCORE4,
      5: CONSTANTS.SCORE.SCORE5,
    };

    posts.forEach((post) => {
      if (scoreCount[post.score] !== undefined) {
        scoreCount[post.score]++;
      }
    });

    const xAxisData = Object.keys(scoreCount).map((key) => scoreLabels[key]);
    const seriesData = Object.values(scoreCount);

    setBarcharDataset({ xAxisData, seriesData });
  };

  return barcharDataset;
}
