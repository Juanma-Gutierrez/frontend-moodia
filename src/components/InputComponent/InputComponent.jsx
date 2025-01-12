import "./InputComponent.scss";
import PropTypes from "prop-types";

export const InputComponent = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) => {
  return (
    <div className="InputComponent">
      {label && <label className="InputComponent-label" htmlFor={name}>{label}</label>}
      {type === "message" ? (
        <textarea
          id={name}
          className="InputComponent-textarea"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          rows="5"
        />
      ) : (
        <input
          id={name}
          className="InputComponent-input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
        />
      )}
    </div>
  );
};

InputComponent.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "password", "number", "tel", "url", "message"]),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};
