import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import Logout from "../logout/Logout";
import Post from "../post/Post";
import Register from "../register/Register";
import NoPage from "../noPage/NoPage";
import NavigationBar from "../navigationBar/NavigationBar";
import Admin from "../admin/Admin";
import Auth from "../../services/authService/Auth";
import { AuthProvider } from "../../services/context/AuthContext";
import PrivateRoute from "../../services/privateRoute/privateRoute";
import { useIsLoadingContext } from "../../services/context/IsLoadingContext";
import { IsLoading } from "../../components/isLoadingComponent/isLoadingComponent";
import Challenge from "../Challenge/Challenge";
import Report from "../Report/Report";

export default function App() {
  const { isLoading } = useIsLoadingContext();

  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}
