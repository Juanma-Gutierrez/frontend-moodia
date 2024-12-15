import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import Post from "../post/Post";
import Register from "../register/Register";
import NoPage from "../noPage/NoPage";
import NavigationBar from "../navigationBar/NavigationBar";
import Admin from "../admin/Admin";
import Auth from "../../services/authService/Auth";
import { AuthProvider } from "../../context/AuthContext";
import PrivateRoute from "../../services/privateRoute/privateRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Auth />
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
              <Route path="register" element={<Register />} />
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
