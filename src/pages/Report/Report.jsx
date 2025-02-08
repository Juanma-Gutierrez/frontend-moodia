// Report.js
import "./Report.scss";
import React, { useEffect, useState } from "react";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useNavigate } from "react-router-dom";
import BarChart from "./Charts/BarChart.jsx";
import BarChartData from "./Charts/BarChartData.jsx";
import AreaChart from "./Charts/AreaChart.jsx";

export default function Report() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();

  const color1 = getComputedStyle(document.documentElement).getPropertyValue("--post-color-score-1");
  const color2 = getComputedStyle(document.documentElement).getPropertyValue("--post-color-score-2");
  const color3 = getComputedStyle(document.documentElement).getPropertyValue("--post-color-score-3");
  const color4 = getComputedStyle(document.documentElement).getPropertyValue("--post-color-score-4");
  const color5 = getComputedStyle(document.documentElement).getPropertyValue("--post-color-score-5");
  const colorsSet = [color1, color2, color3, color4, color5];

  const getPostList = async (token) => {
    if (token) {
      setLogoIsLoading(true);
      const response = await apiGenericRequest("post/list", null, HttpMethod.GET, token);
      switch (response.success) {
        case true:
          setPosts(response.data.data);
          break;
        case false:
          setIsModalKOVisible(true);
          setupSnackbar("Error: " + response.error, SnackbarComponentTypes.ERROR);
          break;
      }
      setLogoIsLoading(false);
    }
  };

  // Guard
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getPostList(token);
    }
  }, [token, navigate]);

  return (
    <div className="report-container">
      <h1>Informes</h1>
      <div className="report-charts-container">
        <BarChart dataset={BarChartData({ posts })} colorsSet={colorsSet} />
        <AreaChart posts={posts} colors={colorsSet} />
      </div>
    </div>
  );
}
