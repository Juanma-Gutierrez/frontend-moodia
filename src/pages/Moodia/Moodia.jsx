import { useState } from "react";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";

export default function Moodia() {
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);

  // Snackbar
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
  };

  return (
    <div>
      <h3>Esta es la página de Moodia</h3>
      <p>Aquí contaré información sobre el proyecto</p>
      {isSnackbarVisible && <SnackbarComponent message="Mensaje" type="info" onClick={handleClickSnackbar} />}
    </div>
  );
}
