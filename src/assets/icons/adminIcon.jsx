import PropTypes from "prop-types";

export const adminIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 32 32">
    <g fill={stroke} strokeLinecap="round" strokeLinejoin="round">
    <title>{"report"}</title>
    <path d="M15 20h2v4h-2zM20 18h2v6h-2zM10 14h2v10h-2z" />
    <path d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" />
    </g>
  </svg>
);

adminIcon.propTypes = {
  stroke: PropTypes.string,
};
