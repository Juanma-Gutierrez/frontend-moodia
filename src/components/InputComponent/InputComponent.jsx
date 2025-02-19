import "./InputComponent.scss";
import PropTypes from "prop-types";

/**
 * InputComponent
 *
 * A reusable input field component that supports both text inputs and text areas.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className=""] - Additional CSS classes for styling.
 * @param {string} [props.label] - Label text for the input field.
 * @param {string} [props.type="text"] - The input type (text, email, password, etc.).
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {string} [props.value] - The current value of the input field.
 * @param {Function} [props.onChange] - Callback function triggered when the input value changes.
 * @param {string} [props.name] - The name attribute of the input field.
 * @returns {JSX.Element} - Returns an input field or a textarea based on the type.
 */
export const InputComponent = ({ className = "", label, type = "text", placeholder, value, onChange, name }) => {
  return (
    <div className={`InputComponent ${className}`}>
      {label && (
        <label className="InputComponent-label" htmlFor={name}>
          {label}
        </label>
      )}
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
