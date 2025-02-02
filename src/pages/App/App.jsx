import "./app.scss";
import Admin from "@pages/admin/Admin";
import Auth from "@services/authService/Auth";
import Challenge from "@pages/Challenge/Challenge";
import Login from "@pages/Login/Login";
import Logout from "@pages/logout/Logout";
import NavigationBar from "@pages/NavigationBar/NavigationBar";
import NoPage from "@pages/noPage/NoPage";
import Post from "@pages/Post/Post";
import PrivateRoute from "@services/privateRoute/privateRoute";
import Register from "@pages/Register/Register";
import Report from "@pages/Report/Report";
import { Routes, Route, useNavigate } from "react-router-dom";
import { IsLoading } from "@components/isLoadingComponent/isLoadingComponent";
import { useEffect, useState } from "react";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { useAuthContext } from "@services/context/AuthContext";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export default function App() {
  const { isLoading, setIsLoading, isKOScreenVisible } = useEnvironmentContext();
  const navigate = useNavigate();
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
    }
    setIsLoading(false);
  };

  return (
    <>
      <Auth />
      {isLoading && <IsLoading isLoading={isLoading} />}
      {isKOScreenVisible && <KOScreen />}
      <div className="app-container">
        <NavigationBar className="navigation-bar"/>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Post />} />
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
