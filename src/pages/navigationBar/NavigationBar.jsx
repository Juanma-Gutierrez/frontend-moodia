import "./navigationBar.scss";

import { Link, useNavigate } from "react-router-dom";
import { NavigationButtonComponent } from "../../components/NavigationButtonComponent/NavigationButtonComponent";
import { adminIcon } from "../../assets/Icons/NavigationBarIcons/AdminIcon";
import { homeIcon } from "../../assets/Icons/NavigationBarIcons/HomeIcon";
import { loginIcon } from "../../assets/Icons/NavigationBarIcons/LoginIcon";
import { logoIcon } from "../../assets/Icons/NavigationBarIcons/LogoIcon";
import { logoutIcon } from "../../assets/Icons/NavigationBarIcons/LogoutIcon";
import { registerIcon } from "../../assets/Icons/NavigationBarIcons/RegisterIcon";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";

export default function NavigationBar() {
  const { token, role } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken && window.location.pathname === "/login") {
        navigate("/post");
      }
    }
  }, [token, navigate]);

  return (
    <div className="sidebar">
      <nav className="nav">
        <ul>
          <li>
            <NavigationButtonComponent title="Moodia" icon={logoIcon} logo={true} />
          </li>
          {token != null && (
            <li>
              <Link to="/">
                <NavigationButtonComponent title="Post" icon={homeIcon} />
              </Link>
            </li>
          )}
          {token === null && (
            <>
              <li>
                <Link to="/login">
                  <NavigationButtonComponent title="Login" icon={loginIcon} />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <NavigationButtonComponent title="Registro" icon={registerIcon} />
                </Link>
              </li>
            </>
          )}
          {role === "Administrador" && (
            <li>
              <Link to="/admin">
                <NavigationButtonComponent title="Administración" icon={adminIcon} />
              </Link>
            </li>
          )}
        </ul>
        <ul>
          {token !== null && (
            <li>
              <Link to="/logout">
                <NavigationButtonComponent title="Cerrar sesión" icon={logoutIcon} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
