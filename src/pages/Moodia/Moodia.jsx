import "./Moodia.scss";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { useState } from "react";

/**
 * Moodia Component
 * @returns {JSX.Element} - Returns the Moodia page with information about the project, technologies used, key features, and more.
 */
export default function Moodia() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  /**
   * Handles the snackbar visibility
   * @returns {void} - Sets the snackbar visibility to false when clicked.
   */
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <div className="moodia-page-container">
      <h1>Moodia: Tu diario personal</h1>
      <p>
        Moodia es una aplicación web desarrollada en <strong>React (frontend)</strong> y{" "}
        <strong>Laravel (backend)</strong> que permite a los usuarios registrar su estado de ánimo diariamente, escribir
        entradas de diario y realizar un seguimiento de sus emociones a lo largo del tiempo. La plataforma ofrece una
        interfaz intuitiva y funcionalidades avanzadas.
      </p>
      <p>
        Proyecto realizado{" "}
        <strong>
          <a href="https://github.com/Juanma-Gutierrez">Juan Manuel Gutiérrez </a>
        </strong>
        como{" "}
        <strong>
          Trabajo Fin de Ciclo del Grado Superior de Desarrollo de Aplicaciones Web del CEIFP Alan Turing (Campanillas -
          Málaga).
        </strong>
      </p>
      <p>
        Documentación completa en{" "}
        <a href="https://juanma-gutierrez.notion.site/Documento-oficial-del-proyecto-TFC-Moodia-11bcb31b28838095a3dff81dc902218b?pvs=4">
          Notion.
        </a>
      </p>

      <h2>Tecnologías utilizadas</h2>

      <div className="moodia-double-block-container">
        <div className="moodia-list-container">
          <div className="moodia-block-container">
            <div className="moodia-image-container">
              <img src="https://www.logo.wine/a/logo/Laravel/Laravel-Logo.wine.svg" />
            </div>
            <h3>Backend (Laravel)</h3>
            <div className="moodia-repository-link">
              <div className="moodia-image-icon-container">
                <img src="https://www.logo.wine/a/logo/GitHub/GitHub-Logo.wine.svg" />
                <a href="https://github.com/Juanma-Gutierrez/backend-moodia">Repositorio GitHub</a>
              </div>
            </div>
            <ul>
              <li>
                <strong>Laravel 11:</strong> Framework PHP para la API REST.
              </li>
              <li>
                <strong>MySQL:</strong> Base de datos para almacenar información de usuarios y publicaciones.
              </li>
              <li>
                <strong>JWT:</strong> Implementación de autenticación segura.
              </li>
              <li>
                <strong>Middleware:</strong> Seguridad y control de acceso en rutas API.
              </li>
            </ul>
          </div>
        </div>
        <div className="moodia-block-container">
          <div className="moodia-image-container">
            <img src="https://www.logo.wine/a/logo/React_(web_framework)/React_(web_framework)-Logo.wine.svg" />
          </div>
          <h3>Frontend (React)</h3>
          <div className="moodia-repository-link">
            <div className="moodia-image-icon-container">
              <img src="https://www.logo.wine/a/logo/GitHub/GitHub-Logo.wine.svg" />
              <a href="https://github.com/Juanma-Gutierrez/frontend-moodia">Repositorio GitHub</a>
            </div>
          </div>
          <ul>
            <li>
              <strong>React:</strong> Biblioteca principal para la UI.
            </li>
            <li>
              <strong>React Router Dom:</strong> Navegación y gestión de rutas.
            </li>
            <li>
              <strong>Hooks (useState, useEffect, useContext, useRef, useNavigate):</strong> Manejo del estado,
              navegaciones, ...
            </li>
            <li>
              <strong>Custom Hooks (useAuth):</strong> Manejo de autenticación y estado del usuario.
            </li>
            <li>
              <strong>Context API:</strong> Administración global del estado.
            </li>
            <li>
              <strong>Uso de modales:</strong> Para mensajes e interacción con el usuario.
            </li>
            <li>
              <strong>SASS:</strong> Diseño modular y escalable con tecnología BEM y nesting.
            </li>
            <li>
              <strong>ECharts:</strong> Representación gráfica de los estados de ánimo.
            </li>
          </ul>
        </div>
      </div>
      <h2>Características clave</h2>

      <h3>1. Registro y autenticación segura</h3>
      <ul>
        <li>Registro de usuarios con validaciones estrictas.</li>
        <li>
          Inicio de sesión seguro con <strong>JWT y Laravel Sanctum</strong>.
        </li>
        <li>
          Gestión de sesiones con <strong>React Context API</strong>.
        </li>
      </ul>

      <h3>2. Publicaciones y seguimiento del estado de ánimo</h3>
      <ul>
        <li>
          Publicaciones diarias con valores entre <strong>1 y 5</strong>.
        </li>
        <li>
          Representación con <strong>emojis personalizados</strong> y colores.
        </li>
        <li>Etiquetas para clasificar publicaciones.</li>
      </ul>

      <h3>3. Análisis de estados de animo</h3>
      <ul>
        <li>
          <strong>Gráficos interactivos con ECharts</strong> para visualizar tendencias emocionales.
        </li>
        <li>
          <strong>Heatmaps y gráficos de barras</strong> para detectar patrones de ánimo.
        </li>
        <li>
          Posible detección de <strong>patrones de alto riesgo</strong> en usuarios.
        </li>
      </ul>

      <h3>4. Gestión de categorías y retos</h3>
      <ul>
        <li>
          <strong>Retos motivacionales</strong> para mejorar el estado emocional.
        </li>
        <li>
          Clasificación de publicaciones mediante <strong>categorías personalizadas</strong>.
        </li>
        <li>
          Sección de <strong>frases inspiradoras</strong> aleatorias.
        </li>
      </ul>

      <h3>5. Diseño y experiencia de usuario</h3>
      <ul>
        <li>
          <strong>Diseño responsive</strong> adaptado a diferentes tamaños de dispositivo.
        </li>
        <li>
          Interfaz optimizada con <strong>animaciones Lottie</strong>.
        </li>
        <li>
          <strong>Componentes reutilizables</strong> para mejorar la mantenibilidad.
        </li>
      </ul>

      <h3>6. Roles Usuario y de Administrador</h3>
      <ul>
        <li>
          <strong>Análisis específico de usuarios</strong> para el administrador.
        </li>
        <li>
          Posibilidad del administrador <strong>asignar mensajes específicos</strong> a los usuarios que así lo
          requieran.
        </li>
        <li>
          <strong>Filtro personalizado</strong> para mejorar el análisis de los perfiles de los usuarios.
        </li>
      </ul>
      {isSnackbarVisible && <SnackbarComponent message="Mensaje" type="info" onClick={handleClickSnackbar} />}
    </div>
  );
}
