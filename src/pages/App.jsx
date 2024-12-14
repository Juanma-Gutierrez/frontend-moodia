import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Post from "./post/Post";
import Register from "./register/Register";
import NoPage from "./noPage/NoPage";
import NavigationBar from "./navigationBar/NavigationBar";
import Admin from "./admin/Admin";
import Auth from "../services/authService/Auth";
import { AuthProvider } from "../context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Auth /> {/* Asegúrate de que Auth se renderiza */}
        <Routes>
          <Route path="/" element={<NavigationBar />}>
            <Route index element={<Post />} />
            <Route path="post" element={<Post />} />
            <Route path="register" element={<Register />} />
            <Route path="admin" element={<Admin />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
