import { useEffect, useState } from "react";
import { CONSTANTS } from "@constants/Constants";

export default function BarChartData({ posts }) {
  const [barcharDataset, setBarcharDataset] = useState({ xAxisData: [], seriesData: [] });

  useEffect(() => {
    calculateBarcharDataset();
  }, [posts]);

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
