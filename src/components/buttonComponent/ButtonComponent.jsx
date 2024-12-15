import PropTypes from "prop-types";
import "./buttonComponent.scss";

export const ButtonComponent = ({ title }) => {
  return (
    <button className="button" onClick={() => console.log({ title })}>
      {title}
    </button>
  );
};

ButtonComponent.propTypes = {
  title: PropTypes.string.isRequired
};
