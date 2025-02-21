import "./ButtonComponent.scss";
import PropTypes from "prop-types";
import { CONSTANTS } from "@constants/Constants";

/**
 * ButtonComponent Component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text displayed on the button.
 * @param {ElementType} [props.icon] - An optional icon component to display alongside the text.
 * @param {Function} props.onClick - The function to execute when the button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.type="info"] - The type of button (e.g., "info-accept", "confirm-accept", etc.).
 * @param {string} [props.width="normal"] - The width of the button ("normal", "full", or custom width).
 * @returns {JSX.Element} - Returns a customizable button component with optional icon and styling.
 */
export const ButtonComponent = ({ text, icon: Icon, onClick, disabled = false, type = "info", width = "normal" }) => {
  /**
   * Retrieves the stroke color for the icon from CSS custom properties.
   */
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--button-icon-color");

  /**
   * Determines the button width based on the `width` prop.
   * Uses constants for "full" and "normal" widths; defaults to "auto" otherwise.
   */
  const buttonWidth =
    width === "full" ? CONSTANTS.BUTTON.WIDTH.FULL : width === "normal" ? CONSTANTS.BUTTON.WIDTH.NORMAL : "auto";

  /**
   * Determines the CSS class for the button based on the `type` prop.
   * Maps button types to their corresponding CSS classes.
   */
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
      {Icon && <Icon className="svg" stroke={stroke} />}
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
