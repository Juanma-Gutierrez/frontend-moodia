import "./ChipComponent.scss";
import PropTypes from "prop-types";

export const ChipComponent = ({ text }) => {
  return <div className="chip">{text}</div>;
};

ChipComponent.propTypes = {
  text: PropTypes.string.isRequired,
};
