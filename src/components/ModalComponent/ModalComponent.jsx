import "./ModalComponent.scss";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";

/**
 * ModalComponent
 *
 * Un componente de modal que permite mostrar diferentes tipos de modales (informativo, confirmación o advertencia) con botones personalizados.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.modalModel - El modelo que contiene los detalles del modal (título, mensaje, botones, tipo).
 * @param {Function} props.onConfirm - Función que se ejecuta cuando el usuario confirma la acción.
 * @param {Function} props.onCancel - Función que se ejecuta cuando el usuario cancela la acción.
 * @returns {JSX.Element} - Un modal con contenido dinámico y botones.
 */
export const ModalComponent = ({ modalModel, onConfirm, onCancel }) => {
  const { title, message, button1 = "Aceptar", button2 = "Cancelar", type } = modalModel;

  /**
   * handleOnConfirm
   *
   * A function that triggers the onConfirm callback with the selected phrase value.
   *
   * @returns {void} - No retorna nada.
   */
  const handleOnConfirm = () => {
    onConfirm();
  };

  /**
   * handleOnCancel
   *
   * A function that triggers the onCancel callback to cancel the phrase assignment action.
   *
   * @returns {void} - No retorna nada.
   */
  const handleOnCancel = () => {
    onCancel();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h1 className="modal-title">{title}</h1>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {type === "info" && <ButtonComponent text={button1} type="info-accept" onClick={handleOnConfirm} />}
          {type === "confirm" && (
            <>
              <ButtonComponent text={button1} type="confirm-accept" onClick={handleOnConfirm} />
              <ButtonComponent text={button2} type="confirm-cancel" onClick={handleOnCancel} />
            </>
          )}
          {/* Un botón para el modal tipo 'warning' */}
          {type === "warning" && <ButtonComponent text={button1} type="warning-accept" onClick={handleOnConfirm} />}
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
