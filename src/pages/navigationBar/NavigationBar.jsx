import { Outlet, Link } from "react-router-dom";
import "./navigationBar.css";
import { ButtonComponent } from "../../components/buttonComponent/ButtonComponent";

function NavigationBar() {
  return (
    <div className="container">
      <nav className="navigationBar">
        <ul className="linksContainer">
          <li>
            <Link to="/">
              <ButtonComponent title="Inicio(Post)"></ButtonComponent>
            </Link>
          </li>
          <li>
            <Link to="/post">
              <ButtonComponent title="Post"></ButtonComponent>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <ButtonComponent title="Login"></ButtonComponent>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <ButtonComponent title="Registro"></ButtonComponent>
            </Link>
          </li>
          <li>
            <Link to="/admin">
              <ButtonComponent title="Administración"></ButtonComponent>
            </Link>
          </li>
          <li>
            <Link to="/noPage">
              {" "}
              <ButtonComponent title="Página no encontrada"></ButtonComponent>
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

export default NavigationBar;
