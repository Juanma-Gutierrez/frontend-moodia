import "./ModalComponent.scss";
import PropTypes from "prop-types";

export const ModalComponent = ({ modalModel, onClose }) => {
  const { title, message, button1, button2 } = modalModel;

  const handleBoton1 = () => {
    onClose(true);
  };

  const handleBoton2 = () => {
    onClose(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-button accept" onClick={handleBoton1}>
            {button1}
          </button>
          <button className="modal-button cancel" onClick={handleBoton2}>
            {button2}
          </button>
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
    button2: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
