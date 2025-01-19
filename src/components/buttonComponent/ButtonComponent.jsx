import PropTypes from "prop-types";
import "./ButtonComponent.scss";
import { CONSTANTS } from "../../constants/Constants";

export const ButtonComponent = ({ text, icon: Icon, onClick, disabled = false, type = "info", width = "normal" }) => {
  const iconColor = getComputedStyle(document.documentElement).getPropertyValue("--icon-color");
  const buttonWidth =
    width === "full" ? CONSTANTS.BUTTON.WIDTH.FULL : width === "normal" ? CONSTANTS.BUTTON.WIDTH.NORMAL : "auto";

  const colorClass = (() => {
    switch (type) {
      case "info-accept":
        return "button-info-accept";
      case "confirm-accept":
        return "button-confirm-accept";
      case "confirm-cancel":
        return "button-confirm-cancel";
      case "warning-accept":
        return "button-warning-accept";
    }
  })();

  return (
    <button className={`button ${colorClass}`} onClick={onClick} disabled={disabled} style={{ width: buttonWidth }}>
      {Icon && (
        <Icon className="svg" stroke={iconColor}>
          Icono
        </Icon>
      )}
      <span className="text">{text}</span>
    </button>
  );
};

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  width: PropTypes.string,
};
