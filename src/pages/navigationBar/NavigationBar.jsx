import "./navigationBar.scss";
import { ButtonComponent } from "../../components/buttonComponent/ButtonComponent";
import { Link, useNavigate } from "react-router-dom";
import { adminIcon } from "../../assets/icons/adminIcon";
import { homeIcon } from "../../assets/icons/homeIcon";
import { loginIcon } from "../../assets/icons/loginIcon";
import { logoutIcon } from "../../assets/icons/logoutIcon";
import { registerIcon } from "../../assets/icons/registerIcon";
import { useAuth } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { logoIcon } from "../../assets/icons/logoIcon";

export default function NavigationBar() {
  const { token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken && window.location.pathname === "/login") {
        navigate("/post");
      }
    }
  }, [token, navigate]);

  useEffect(() => {
    // if (role) {
    //   navigate("/post");
    // }
  }, [role, navigate]);

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <li>
            <ButtonComponent title="Moodia" icon={logoIcon} logo={true} />
          </li>
          {token != null && role == "Usuario" && (
            <li>
              <Link to="/">
                <ButtonComponent title="Post" icon={homeIcon} />
              </Link>
            </li>
          )}
          {token === null && (
            <>
              <li>
                <Link to="/login">
                  <ButtonComponent title="Login" icon={loginIcon} />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <ButtonComponent title="Registro" icon={registerIcon} />
                </Link>
              </li>
            </>
          )}
          {role === "Administrador" && (
            <li>
              <Link to="/admin">
                <ButtonComponent title="Administración" icon={adminIcon} />
              </Link>
            </li>
          )}
        </ul>
        <ul>
          {token !== null && (
            <li>
              <Link to="/logout">
                <ButtonComponent title="Cerrar sesión" icon={logoutIcon} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
