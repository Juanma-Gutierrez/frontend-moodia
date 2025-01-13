import "./ChipComponent.scss";
import PropTypes from "prop-types";

export const ChipComponent = ({ text, onClick, isSelected }) => {
  return <div className={`chip ${isSelected ? "selected" : ""}`} onClick={onClick}>{text}</div>;
};

ChipComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
