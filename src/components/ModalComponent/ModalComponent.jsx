import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import "./ModalComponent.scss";
import PropTypes from "prop-types";

export const ModalComponent = ({ modalModel, onClose }) => {
  const { title, message, button1 = "Aceptar", button2 = "Cancelar", type } = modalModel;

  const handleBoton1 = () => {
    onClose(true);
  };

  const handleBoton2 = () => {
    onClose(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">
          {title}
        </h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {/* Botón único para el modal tipo 'info' */}
          {type === "info" && <ButtonComponent text={button1} type="info-accept" onClick={handleBoton1} />}
          {/* Dos botones para el modal tipo 'confirm' */}
          {type === "confirm" && (
            <>
              <ButtonComponent text={button1} type="confirm-accept" onClick={handleBoton1} />
              <ButtonComponent text={button2} type="confirm-cancel" onClick={handleBoton2} />
            </>
          )}
          {/* Un botón para el modal tipo 'warning' */}
          {type === "warning" && <ButtonComponent text={button1} type="warning-accept" onClick={handleBoton1} />}
        </div>
      </div>
    </div>
  );
};

ModalComponent.propTypes = {
  modalModel: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["info", "confirm", "warning"]),
};
