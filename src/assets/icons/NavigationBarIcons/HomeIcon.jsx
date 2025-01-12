import PropTypes from "prop-types";

export const homeIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.985 5.674V1.98a1 1 0 0 0-2 0v2.336l-5.188-3.5a4.98 4.98 0 0 0-5.594 0l-7 4.724A4.995 4.995 0 0 0 0 9.685v9.316c0 2.757 2.243 5 5 5h14c2.757 0 5-2.243 5-5V9.685c0-1.587-.75-3.069-2.015-4.011ZM8 22c0-2.206 1.794-4 4-4s4 1.794 4 4H8Zm14-3c0 1.654-1.346 3-3 3h-1c0-3.309-2.691-6-6-6s-6 2.691-6 6H5c-1.654 0-3-1.346-3-3V9.684c0-.999.494-1.928 1.322-2.486l7-4.724a2.993 2.993 0 0 1 3.356 0l7 4.724A2.995 2.995 0 0 1 22 9.684V19ZM12 7c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4Zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2Z" />
    </g>
  </svg>
);

homeIcon.propTypes = {
  stroke: PropTypes.string,
};
