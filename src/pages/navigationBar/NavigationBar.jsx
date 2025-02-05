import "./NavigationBar.scss";
import { AdminIcon } from "@assets/Icons/NavigationBarIcons/AdminIcon";
import { ChallengeIcon } from "@assets/Icons/NavigationBarIcons/ChallengeIcon";
import { Link, useNavigate } from "react-router-dom";
import { LoginIcon } from "@assets/Icons/NavigationBarIcons/LoginIcon";
import { LogoIcon } from "@assets/Icons/NavigationBarIcons/LogoIcon";
import { LogoutIcon } from "@assets/Icons/NavigationBarIcons/LogoutIcon";
import { NavigationButtonComponent } from "@components/NavigationButtonComponent/NavigationButtonComponent";
import { PostIcon } from "@assets/Icons/NavigationBarIcons/PostIcon";
import { RegisterIcon } from "@assets/Icons/NavigationBarIcons/RegisterIcon";
import { ReportIcon } from "@assets/Icons/NavigationBarIcons/ReportIcon";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";

export default function NavigationBar() {
  const [admin, setAdmin] = useState();
  const navigate = useNavigate();
  const { token, user, extendedUser } = useAuthContext();

  useEffect(() => {
    if (token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken && window.location.pathname === "/login") {
        navigate("/post");
      }
    }
  }, [token, navigate]);

  useEffect(() => {
    // 1: Usuario // 2: Administrador
    setAdmin(extendedUser && extendedUser.idRole === 2);
  }, [user, extendedUser, token]);

  return (
    <div className="sidebar">
      {/* PC navbar */}
      <nav className="nav-normal-width">
        <ul>
          <li>
            <Link to="/moodia">
              <NavigationButtonComponent title="Moodia" icon={LogoIcon} logo={true} />
            </Link>
          </li>
          {token !== null && (
            <li>
              <Link to="/">
                <NavigationButtonComponent title="Post" icon={PostIcon} />
              </Link>
            </li>
          )}
          {token !== null && (
            <li>
              <Link to="/challenge">
                <NavigationButtonComponent title="Reto diario" icon={ChallengeIcon} />
              </Link>
            </li>
          )}
          {token !== null && (
            <li>
              <Link to="/report">
                <NavigationButtonComponent title="Informes" icon={ReportIcon} />
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
          {/* {role === "Administrador" && ( */}
          {admin && (
            <li>
              <Link to="/admin">
                <NavigationButtonComponent title="Administración" icon={AdminIcon} />
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
      {/* Mobile navbar */}
      <nav className="nav-mobile-width">
        <ul>
          {token !== null && (
            <li>
              <Link to="/">
                <NavigationButtonComponent icon={PostIcon} />
              </Link>
            </li>
          )}
          {token !== null && (
            <li>
              <Link to="/challenge">
                <NavigationButtonComponent icon={ChallengeIcon} />
              </Link>
            </li>
          )}
          {token !== null && (
            <li>
              <Link to="/report">
                <NavigationButtonComponent icon={ReportIcon} />
              </Link>
            </li>
          )}
          {token === null && (
            <>
              <li>
                <Link to="/login">
                  <NavigationButtonComponent icon={LoginIcon} />
                </Link>
              </li>
              <li>
                <div to="/register">
                  <NavigationButtonComponent icon={RegisterIcon} />
                </div>
              </li>
            </>
          )}
          {/* {role === "Administrador" && ( */}
          {admin && (
            <li>
              <div to="/admin">
                <NavigationButtonComponent icon={AdminIcon} />
              </div>
            </li>
          )}
          {token !== null && (
            <li>
              <div to="/logout">
                <NavigationButtonComponent icon={LogoutIcon} />
              </div>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
