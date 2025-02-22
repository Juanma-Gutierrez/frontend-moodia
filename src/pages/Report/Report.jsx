import "./Report.scss";
import AreaChart from "./Charts/AreaChart.jsx";
import BarChart from "./Charts/BarChart.jsx";
import BarChartData from "./Charts/BarChartData.jsx";
import BarRaceChart from "./Charts/BarRaceChart.jsx";
import CalendarHeatmap from "./Charts/CalendarHeatmapChart.jsx";
import React, { useEffect, useState } from "react";
import { CONSTANTS } from "@constants/Constants.jsx";
import { HttpMethod } from "@services/ApiService/HttpMethod";
import { apiGenericRequest } from "@services/ApiService/ApiGenericRequest";
import { useAuthContext } from "@services/Context/AuthContext";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";
import { useNavigate } from "react-router-dom";

/**
 * The Report component displays various charts related to mood reports.
 * It fetches the posts data, processes it, and renders the charts with the data.
 * It also handles user authentication and redirects to login if not authenticated.
 * @returns {JSX.Element} - The rendered JSX component containing charts and posts.
 */
export default function Report() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { setLogoIsLoading } = useEnvironmentContext();
  const colorsSet = CONSTANTS.COLORS_GLOBAL;

  /**
   * Fetches the list of posts from the API.
   * If the token is available, the function sends an API request to get the posts.
   * If the request is successful, it updates the posts state.
   * If the request fails, it shows an error modal and a snackbar message.
   * @param {string} token - The authentication token used to authorize the API request.
   * @returns {void} - No return value. Updates the posts state or shows an error modal/snackbar.
   */
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

  /**
   * Effect hook for checking user authentication and fetching data
   * @returns {void} - Redirects to login if no token is found, otherwise fetches the post list.
   */
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
