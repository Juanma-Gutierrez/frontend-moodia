import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import Post from "./post/Post";
import Register from "./register/Register";
import NoPage from "./noPage/NoPage";
import NavigationBar from "./navigationBar/NavigationBar";
import Admin from "./admin/Admin";
import { useEffect } from "react";
import Auth from "../services/authService/Auth";

function App() {
  const init = () => {
    Auth();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
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
  );
}

export default App;
