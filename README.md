## **Resumen del Frontend de Moodia**

El frontend de **Moodia** está desarrollado en **React 18** y utiliza **Vite** como entorno de desarrollo. Está diseñado como una aplicación de una sola página (**SPA**) con un sistema de autenticación basado en **JWT**. La aplicación consume la API REST desarrollada en Laravel y proporciona una interfaz interactiva para la gestión de estados de ánimo, publicaciones, desafíos y frases inspiradoras.

## **Estructura del Proyecto**

El proyecto sigue una arquitectura modular y organizada en distintos directorios dentro de `src/`:

```
src/
├── assets/             # Imágenes, iconos y animaciones Lottie
├── components/         # Componentes reutilizables (Botones, Modales, Inputs, etc.)
├── constants/          # Constantes de la aplicación
├── pages/              # Vistas de la aplicación
├── services/           # Lógica de negocio y llamadas a la API
│   ├── apiService/     # Módulos de comunicación con el backend
│   ├── authService/    # Gestión de autenticación
│   ├── context/        # Contextos globales de la aplicación
│   ├── privateRoute/   # Control de rutas privadas
│   └── utils/          # Funciones auxiliares
└── main.jsx            # Punto de entrada de la aplicación
```

## **1. Maquetación CSS**

Se ha utilizado **SCSS** en lugar de CSS puro, lo que permite el uso de variables y mejor organización del código. Se ha optado por una arquitectura **modular**, donde cada componente tiene su propio archivo `.scss`, lo que mejora la mantenibilidad.

### **Uso de variables CSS / SCSS**

Se definen variables globales en `index.scss` para:

- **Colores primarios y secundarios** (ej. `-primary-dark: #301471;`)
- **Espaciados y márgenes** (ej. `-margin-large: 16px;`)
- **Tamaños de fuente y pesos**
- **Sombras y bordes**

### **Arquitectura de ficheros CSS**

- Cada componente tiene su propio archivo `.scss` (ej. `ButtonComponent.scss`, `ModalComponent.scss`).
- Existe un archivo global (`index.scss`) que contiene variables y reseteo de estilos.

### **Metodología CSS (BEM y Nesting)**

Se ha utilizado **BEM** para mejorar la legibilidad y evitar colisiones:

```scss
.button--primary {
  background-color: var(--primary-dark);
  &:hover {
    background-color: var(--primary-light);
  }
}
```

También se ha usado **Nesting** de SCSS para agrupar estilos relacionados.

### **Layouts y Responsive Design**

- Uso de **Flexbox** y **Grid** para organizar los elementos.
- Uso de **medidas relativas** (`vw`, `vh`, `%`, `rem`).
- Media queries en `@media (max-width: 768px)` para adaptar la interfaz a dispositivos móviles.

### **Accesibilidad**

- Se ha pasado un **evaluador de accesibilidad** para mejorar la usabilidad (ej. etiquetas `aria-label` en botones).

## **2. Lógica Frontend (React y Librerías Usadas)**

El frontend está basado en **React 18** con Vite, lo que permite una carga rápida y eficiente.

### **Librerías Usadas**

| Librería | Uso |
| --- | --- |
| `react-router-dom` | Manejo de rutas |
| `react-toastify` | Notificaciones emergentes |
| `lottie-web` y `react-lottie` | Animaciones Lottie |
| `echarts` y `echarts-for-react` | Gráficos estadísticos |
| `date-fns` | Manejo de fechas |
| `sass-embedded` | SCSS para estilos avanzados |

### **Hooks Utilizados**

| Hook | Uso |
| --- | --- |
| `useState` | Manejo de estados locales |
| `useEffect` | Llamadas a la API y efectos secundarios |
| `useContext` | Consumo del `AuthContext` y `EnvironmentContext` |
| `useRef` | Referencias para formularios y animaciones |
| `useNavigate` | Navegación en `react-router-dom` |

### **Gestión de Formularios**

- Se ha optado por **useState** en los formularios para mantener controlados los valores de entrada.
- Validación simple antes de enviar los datos.

### **Portals en Modales**

Se usa `ReactDOM.createPortal` para renderizar los modales fuera del flujo principal.

### **Usabilidad y Reusabilidad de Componentes**

- Uso de **props y children** para hacer componentes más reutilizables.
- Ejemplo de un **componente reutilizable de botón**:

```jsx
 <ButtonComponent
	 type="confirm-accept"
	 text="Aceptar reto"
	 onClick={handleAcceptChallenge}
	 width="full"/>
```

### **Custom Hooks**

Se ha creado un hook `useAuth` en `AuthContext.jsx` para manejar autenticación y estado del usuario.

### **Gestión de Estados**

- **Prop Drilling** en componentes pequeños.
- **ContextAPI** en `AuthContext` para variables de autenticación, usuario logado y token.
- **ContextAPI** `EnvironmentContext` para datos globales como lista de géneros, de estados civiles, de empleos, estado de pantallas de KO, de pantallas isLoading de carga.

### **Fetching Data (Conexión con el Backend)**

- Se han usado **fetch con async/await** y **axios** en `apiService`.
- Se gestiona el estado de carga con `useState`.

Para realizar las peticiones a la API se ha utilizado una función genérica denominada `apiGenericRequest` que recibe por parámetro el endpoint, el body si fuera necesario, el método HTTP y el token si fuera necesario y devuelve la respuesta del servicio.

Ejemplo de petición a la API:

```jsx
const responseExtendedUser = await apiGenericRequest(
	`extended_user/${responseUser.data.id}`,
	body,
  HttpMethod.POST,
  responseToken.data.access_token
);
```

## **3. Sistema de Rutas con React Router**

Definido en `main.jsx` y `privateRoute.jsx` para proteger rutas privadas.

Ejemplo de rutas protegidas:

```jsx
<Route path="admin" element={
	<PrivateRoute>
      <Admin />
  </PrivateRoute>
}/>
```

Las rutas son las siguientes:

| Ruta | Componente |
| --- | --- |
| `/` | `Moodia.jsx` |
| `/login` | `Login.jsx` |
| `/register` | `Register.jsx` |
| `/logout` | `Logout.jsx` |
| `/post` | `Post.jsx` |
| `/challenge` | `Challenge.jsx` |
| `/report` | `Report.jsx` |
| `/admin` | `Admin.jsx` |
| `/moodia` | `Moodia.jsx` |