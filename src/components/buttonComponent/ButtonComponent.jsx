import PropTypes from "prop-types";
import "./buttonComponent.css";

export const ButtonComponent = ({ title }) => {
  console.log(title);
  return (
    <button className="button" onClick={() => console.log({ title })}>
      {title}
    </button>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
