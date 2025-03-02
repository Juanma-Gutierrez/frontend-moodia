import PropTypes from "prop-types";

/**
 * EmojiIcon4 Component
 * @param {Object} props - The component props. Additional SVG properties can be passed here.
 * @returns {JSX.Element} - Returns an SVG element representing a custom emoji icon.
 */
export const EmojiIcon4 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <defs>
      <style>{".b4{fill:#864e20}"}</style>
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
      d="M8.907 9.844a.182.182 0 0 1-.331.1 2.016 2.016 0 0 0-.569-.567 1.731 1.731 0 0 0-1.915 0 2.016 2.016 0 0 0-.571.569.182.182 0 0 1-.331-.1 1.632 1.632 0 0 1 .346-1.023 1.927 1.927 0 0 1 3.026 0 1.64 1.64 0 0 1 .345 1.021zm9.903 0a.182.182 0 0 1-.331.1 2.026 2.026 0 0 0-.568-.567 1.732 1.732 0 0 0-1.916 0 2.016 2.016 0 0 0-.571.569.182.182 0 0 1-.331-.1 1.632 1.632 0 0 1 .346-1.023 1.927 1.927 0 0 1 3.026 0 1.64 1.64 0 0 1 .345 1.021z"
      className="b4"
    />
    <path
      d="M23 13.938a14.69 14.69 0 0 1-12.406 6.531c-5.542 0-6.563-1-9.142-2.529A7.66 7.66 0 0 0 8.656 23h6.688A7.656 7.656 0 0 0 23 15.344z"
      style={{
        fill: "#e7c930",
      }}
    />
    <path
      d="M16.666 12.583H7.334a.493.493 0 0 0-.492.544c.123 1.175.875 3.842 5.158 3.842s5.035-2.667 5.158-3.842a.493.493 0 0 0-.492-.544z"
      className="b4"
    />
    <path
      d="M12 16.969a6.538 6.538 0 0 0 2.959-.6 1.979 1.979 0 0 0-1.209-.853c-1.344-.3-1.75.109-1.75.109s-.406-.406-1.75-.109a1.979 1.979 0 0 0-1.209.853 6.538 6.538 0 0 0 2.959.6z"
      style={{
        fill: "#f06880",
      }}
    />
  </svg>
);

EmojiIcon4.propTypes = {
  props: PropTypes.string,
};
