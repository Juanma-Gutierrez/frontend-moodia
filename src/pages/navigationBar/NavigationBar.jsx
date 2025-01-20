import "./navigationBar.scss";

import { Link, useNavigate } from "react-router-dom";
import { NavigationButtonComponent } from "../../components/NavigationButtonComponent/NavigationButtonComponent";
import { adminIcon } from "../../assets/Icons/NavigationBarIcons/AdminIcon";
import { PostIcon } from "../../assets/Icons/NavigationBarIcons/PostIcon";
import { challengeIcon } from "../../assets/Icons/NavigationBarIcons/ChallengeIcon";
import { LoginIcon } from "../../assets/Icons/NavigationBarIcons/LoginIcon";
import { LogoIcon } from "../../assets/Icons/NavigationBarIcons/LogoIcon";
import { LogoutIcon } from "../../assets/Icons/NavigationBarIcons/LogoutIcon";
import { RegisterIcon } from "../../assets/Icons/NavigationBarIcons/RegisterIcon";
import { reportIcon } from "../../assets/Icons/NavigationBarIcons/ReportIcon";
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
            <NavigationButtonComponent title="Moodia" icon={LogoIcon} logo={true} />
          </li>
          {token != null && (
            <li>
              <Link to="/">
                <NavigationButtonComponent title="Post" icon={PostIcon} />
              </Link>
            </li>
          )}
          {token != null && (
            <li>
              <Link to="/challenge">
                <NavigationButtonComponent title="Reto diario" icon={challengeIcon} />
              </Link>
            </li>
          )}
          {token != null && (
            <li>
              <Link to="/report">
                <NavigationButtonComponent title="Informes" icon={reportIcon} />
              </Link>
            </li>
          )}
          {token === null && (
            <>
              <li>
                <Link to="/login">
                  <NavigationButtonComponent title="Login" icon={LoginIcon} />
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <NavigationButtonComponent title="Registro" icon={RegisterIcon} />
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
                <NavigationButtonComponent title="Cerrar sesión" icon={LogoutIcon} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
