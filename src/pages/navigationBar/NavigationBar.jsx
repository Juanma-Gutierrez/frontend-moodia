import { Outlet, Link } from "react-router-dom";
import "./navigationBar.css";

function NavigationBar() {
  return (
    <div className="container">
      <nav className="navigationBar">
        <ul className="linksContainer">
          <li>
            <Link to="/">Inicio(post)</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Registro</Link>
          </li>
          <li>
            <Link to="/admin">Administración</Link>
          </li>
          <li>
            <Link to="/noPage">Página no encontrada</Link>
          </li>
        </ul>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default NavigationBar;
