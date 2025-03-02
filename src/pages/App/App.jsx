import "./App.scss";
import Admin from "@pages/Admin/Admin";
import Auth from "@services/AuthService/Auth";
import Challenge from "@pages/Challenge/Challenge";
import Login from "@pages/Login/Login";
import Logout from "@pages/Logout/Logout";
import Moodia from "@pages/Moodia/Moodia";
import NavigationBar from "@pages/NavigationBar/NavigationBar";
import NoPage from "@pages/NoPage/NoPage";
import Post from "@pages/Post/Post";
import PrivateRoute from "@services/PrivateRoute/PrivateRoute";
import Register from "@pages/Register/Register";
import Report from "@pages/Report/Report";
import { HttpMethod } from "@services/ApiService/HttpMethod";
import { IsLoadingComponent } from "@components/IsLoadingComponent/IsLoadingComponent";
import { KOScreen } from "@components/KoScreenComponent/KoScreenComponent";
import { LogoIsLoadingComponent } from "@components/LogoIsLoadingComponent/LogoIsLoadingComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { apiGenericRequest } from "@services/ApiService/ApiGenericRequest";
import { useAuthContext } from "@services/Context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";

/**
 * App Component
 * @returns {JSX.Element} - Returns the main App component with routing and loading state handling.
 */
export default function App() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { isLoading, setIsLoading, logoIsLoading, setLogoIsLoading, isKOScreenVisible, setIsKOScreenVisible } =
    useEnvironmentContext();
  const { setUser, setExtendedUser } = useAuthContext();
  const [failureMessage, setFailureMessage] = useState("");

  /**
   * useEffect Hook
   * @returns {void} - Calls the `activateIsLoading` function on component mount.
   */
  useEffect(() => {
    activateIsLoading();
  }, []);

  /**
   * activateIsLoading function
   * @returns {void} - Activates the loading state and starts the initialization after a timeout.
   */
  const activateIsLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      init();
    }, 1000);
  };

  /**
   * init function
   * @returns {void} - Initializes the app by checking the token and loading user data.
   */
  const init = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const responseUser = await apiGenericRequest("auth/me", null, HttpMethod.POST, token);
        if (responseUser.success) {
          const responseExtendedUser = await apiGenericRequest(
            `extended_user/${responseUser.data.id}`,
            null,
            HttpMethod.POST,
            token
          );
          if (responseUser.data) {
            setUser(responseUser.data);
            setExtendedUser(responseExtendedUser.data);
            if (responseExtendedUser.data.idRole === 1) {
              navigate("/post");
            } else if (responseExtendedUser.data.idRole === 2) {
              navigate("/admin");
            }
          }
        } else {
          setFailureMessage(responseUser.error);
        }
      } catch (error) {
        console.error("Request error:", error);
        setFailureMessage("An error occurred while authenticating.");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (failureMessage!="") {
      setIsLoading(false);
      setIsKOScreenVisible(true);
      setIsSnackbarVisible(true);
      setSnackbarMessage(failureMessage);
    }
  }, [failureMessage]);

  /**
   * handleClickSnackbar function
   * @returns {void} - Handles closing the snackbar when clicked.
   */
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <>
      <Auth />
      {isLoading && <IsLoadingComponent isLoading={isLoading} />}
      {!isLoading && logoIsLoading && <LogoIsLoadingComponent />}
      {isKOScreenVisible && <KOScreen />}
      {isSnackbarVisible && <SnackbarComponent message={snackbarMessage} type="error" onClick={handleClickSnackbar} />}
      <div className="app-container">
        <NavigationBar className="navigation-bar" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Post />} />
            <Route path="moodia" element={<Moodia />} />
            <Route
              path="post"
              element={
                <PrivateRoute>
                  <Post />
                </PrivateRoute>
              }
            />
            <Route
              path="challenge"
              element={
                <PrivateRoute>
                  <Challenge />
                </PrivateRoute>
              }
            />
            <Route
              path="report" 
              element={
                <PrivateRoute>
                  <Report />
                </PrivateRoute>
              }
            />
            <Route
              path="register"
              element={
                <PrivateRoute isPublic={true}>
                  <Register />
                </PrivateRoute>
              }
            />
            <Route
              path="admin"
              element={
                <PrivateRoute>
                  <Admin />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
