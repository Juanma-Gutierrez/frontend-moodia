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
import CalendarHeatmap from "./Charts/CalendarHeatmapChart.jsx";
import BarRaceChart from "./Charts/BarRaceChart.jsx";
import { CONSTANTS } from "@constants/Constants.jsx";

export default function Report() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();

  const colorsSet = CONSTANTS.COLORS_GLOBAL;

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
      <h1>Informes de estados de ánimo</h1>
      <div className="report-charts-container">
        <BarRaceChart posts={posts} />
        <CalendarHeatmap posts={posts} />
        <BarChart dataset={BarChartData({ posts })} colorsSet={colorsSet} />
        <AreaChart posts={posts} colors={colorsSet} />
      </div>
    </div>
  );
}
