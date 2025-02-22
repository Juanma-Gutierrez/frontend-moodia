import PropTypes from "prop-types";

/**
 * EmojiIcon2 Component
 * @param {Object} props - The component props. Additional SVG properties can be passed here.
 * @returns {JSX.Element} - Returns an SVG element representing a custom emoji icon.
 */
export const EmojiIcon2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>{".b2{fill:#e7c930}.c2{fill:#864e20}"}</style>
    </defs>
    <rect
      width={22}
      height={22}
      x={1}
      y={1}
      rx={7.656}
      style={{
        fill: "#f8de40",
      }}
    />
    <path
      d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
      className="b2"
    />
    <path
      d="M7.055 7.313A1.747 1.747 0 1 0 8.8 9.059a1.747 1.747 0 0 0-1.745-1.746zm9.903 0A1.747 1.747 0 1 0 18.7 9.059a1.747 1.747 0 0 0-1.742-1.746z"
      className="c2"
    />
    <path
      d="M8.42 13.921a4.184 4.184 0 0 0-1.366-2.541 4.185 4.185 0 0 0-1.365 2.541c-.111 1.476.937 1.762 1.365 1.762s1.477-.283 1.366-1.762z"
      style={{
        fill: "#26a9e0",
      }}
    />
    <path
      d="M14.512 13.366a5.943 5.943 0 0 0-5.024 0c-.592.369-.557-.694.753-.974A7.35 7.35 0 0 1 12 12.078a7.35 7.35 0 0 1 1.759.314c1.31.28 1.341 1.343.753.974z"
      className="c2"
    />
    <path
      d="M13.074 14.269a2.542 2.542 0 0 0-2.148 0c-.253.158-.238-.3.322-.416a3.144 3.144 0 0 1 .752-.134 3.144 3.144 0 0 1 .752.134c.56.12.575.574.322.416z"
      className="b2"
    />
  </svg>
);

EmojiIcon2.propTypes = {
  props: PropTypes.string,
};
