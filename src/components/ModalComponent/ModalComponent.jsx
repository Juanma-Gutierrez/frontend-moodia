import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import "./ModalComponent.scss";
import PropTypes from "prop-types";

export const ModalComponent = ({ modalModel, onConfirm, onCancel }) => {
  const { title, message, button1 = "Aceptar", button2 = "Cancelar", type } = modalModel;

  const handleButton1 = () => {
    onConfirm();
  };

  const handleButton2 = () => {
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {/* Botón único para el modal tipo 'info' */}
          {type === "info" && <ButtonComponent text={button1} type="info-accept" onClick={handleButton1} />}
          {/* Dos botones para el modal tipo 'confirm' */}
          {type === "confirm" && (
            <>
              <ButtonComponent text={button1} type="confirm-accept" onClick={handleButton1} />
              <ButtonComponent text={button2} type="confirm-cancel" onClick={handleButton2} />
            </>
          )}
          {/* Un botón para el modal tipo 'warning' */}
          {type === "warning" && <ButtonComponent text={button1} type="warning-accept" onClick={handleButton1} />}
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
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  type: PropTypes.oneOf(["info", "confirm", "warning"]),
};
