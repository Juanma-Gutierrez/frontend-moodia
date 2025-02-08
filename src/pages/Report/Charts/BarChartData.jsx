import { useEffect, useState } from "react";

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
      1: "Muy mal",
      2: "Mal",
      3: "Normal",
      4: "Bien",
      5: "Muy bien",
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
