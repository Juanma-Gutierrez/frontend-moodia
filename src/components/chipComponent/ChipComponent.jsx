import "./ChipComponent.scss";
import PropTypes from "prop-types";

export const Chip = ({ text }) => {
  return <div className="chip">{text}</div>;
};

Chip.propTypes = {
  text: PropTypes.string.isRequired,
};
