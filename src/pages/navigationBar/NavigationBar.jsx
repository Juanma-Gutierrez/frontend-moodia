import { Outlet, Link, useNavigate } from "react-router-dom";
import "./navigationBar.scss";
import { ButtonComponent } from "../../components/buttonComponent/ButtonComponent";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function NavigationBar() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica si hay token en localStorage al cargar la página
    if (token) {
      // Solo redirige a /post si no está ya en la página de login (es decir, si la primera vez)
      const storedToken = localStorage.getItem("token");
      if (storedToken && window.location.pathname === "/login") {
        navigate("/post");
      }
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <nav className="navigationBar">
        <ul className="linksContainer">
          <li>
            <Link to="/">
              <ButtonComponent title="Inicio(Post)" />
            </Link>
          </li>
          <li>
            <Link to="/post">
              <ButtonComponent title="Post" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <ButtonComponent title="Login" />
            </Link>
          </li>
          <li>
            <Link to="/register">
              <ButtonComponent title="Registro" />
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <ButtonComponent title="Administración" />
            </Link>
          </li>
          <li>
            <Link to="/noPage">
              <ButtonComponent title="Página no encontrada" />
            </Link>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
