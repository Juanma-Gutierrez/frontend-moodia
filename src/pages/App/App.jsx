import "./app.scss";
import Admin from "@pages/admin/Admin";
import Auth from "@services/authService/Auth";
import Challenge from "@pages/Challenge/Challenge";
import Login from "@pages/Login/Login";
import Logout from "@pages/logout/Logout";
import Moodia from "@pages/Moodia/Moodia";
import NavigationBar from "@pages/NavigationBar/NavigationBar";
import NoPage from "@pages/noPage/NoPage";
import Post from "@pages/Post/Post";
import PrivateRoute from "@services/privateRoute/privateRoute";
import Register from "@pages/Register/Register";
import Report from "@pages/Report/Report";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { IsLoadingComponent } from "@components/isLoadingComponent/isLoadingComponent";
import { LogoIsLoadingComponent } from "@components/LogoIsLoadingComponent/LogoIsLoadingComponent";
import { Routes, Route, useNavigate } from "react-router-dom";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export default function App() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();
  const { isLoading, setIsLoading, logoIsLoading, setLogoIsLoading, isKOScreenVisible } = useEnvironmentContext();
  const { setUser, setExtendedUser } = useAuthContext();

  useEffect(() => {
    activateIsLoading();
  }, []);

  const activateIsLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      init();
    }, 1000);
  };

  const init = async () => {
    setIsLoading(true);

    const token = localStorage.getItem("token");
    if (token) {
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
        setIsSnackbarVisible(true);
        setSnackbarMessage(responseUser.error);
      }
    }
    setIsLoading(false);
  };

  // Snackbar
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <>
      <Auth />
      {isLoading && <IsLoadingComponent isLoading={isLoading} />}
      {!isLoading && logoIsLoading && <LogoIsLoadingComponent />}
      {isSnackbarVisible && <SnackbarComponent message={snackbarMessage} type="error" onClick={handleClickSnackbar} />}
      {isKOScreenVisible && <KOScreen />}
      <div className="app-container">
        <NavigationBar className="navigation-bar" />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Post />} />
            <Route
              path="moodia"
              element={
                <PrivateRoute>
                  <Moodia />
                </PrivateRoute>
              }
            />
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
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <NoPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
