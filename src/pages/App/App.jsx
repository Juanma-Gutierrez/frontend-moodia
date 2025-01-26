import "./app.scss";
import Admin from "../admin/Admin";
import Auth from "../../services/authService/Auth";
import Challenge from "../Challenge/Challenge";
import Login from "../Login/Login";
import Logout from "../logout/Logout";
import NavigationBar from "../NavigationBar/NavigationBar";
import NoPage from "../noPage/NoPage";
import Post from "../Post/Post";
import PrivateRoute from "../../services/privateRoute/privateRoute";
import Register from "../Register/Register";
import Report from "../Report/Report";
import { Routes, Route, useNavigate } from "react-router-dom";
import { IsLoading } from "../../components/isLoadingComponent/isLoadingComponent";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";
import { useEffect } from "react";
import { apiGenericRequest } from "../../services/apiService/ApiGenericRequest";
import { HttpMethod } from "../../services/apiService/HttpMethod";
import { useAuthContext } from "../../services/context/AuthContext";

export default function App() {
  const { isLoading, setIsLoading } = useIsLoadingContext();
  const navigate = useNavigate();
  const { user, setUser, token, setToken, extendedUser, setExtendedUser } = useAuthContext();

  useEffect(() => {
    init();
  }, []);

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
        // setToken(token);
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
      {isLoading && <IsLoading isLoading={isLoading}>Cargando</IsLoading>}
      <div className="app-container">
        <NavigationBar />
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
