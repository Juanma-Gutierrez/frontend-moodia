import "./ChipComponent.scss";
import PropTypes from "prop-types";

/**
 * ChipComponent Component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text displayed inside the chip.
 * @param {Function} [props.onClick] - The function to execute when the chip is clicked (optional).
 * @param {boolean} [props.isSelected=false] - Whether the chip is in a selected state.
 * @param {boolean} [props.isClickable=true] - Whether the chip is clickable.
 * @returns {JSX.Element} - Returns a chip component with customizable text, click behavior, and selection state.
 */
export const ChipComponent = ({ text, onClick, isSelected, isClickable = true }) => {
  return (
    <div className={`chip ${isSelected ? "selected" : ""} ${isClickable ? "clickable" : ""}`} onClick={onClick}>
      {text}
    </div>
  );
};

ChipComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
