import "./ChipComponent.scss";
import PropTypes from "prop-types";

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
