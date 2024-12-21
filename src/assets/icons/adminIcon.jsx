import PropTypes from "prop-types";

export const adminIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" {...stroke}>
    <g fill={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 17v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 2 0Zm7-3a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0v-4a1 1 0 0 0-1-1Zm-4-3a1 1 0 0 0-1 1v7a1 1 0 0 0 2 0v-7a1 1 0 0 0-1-1Zm10-.515V19c0 2.757-2.243 5-5 5H7c-2.757 0-5-2.243-5-5V5c0-2.757 2.243-5 5-5h4.515c1.869 0 3.627.728 4.95 2.05l3.484 3.486A6.952 6.952 0 0 1 22 10.486Zm-6.949-7.021A5.011 5.011 0 0 0 14 2.659V7c0 .551.448 1 1 1h4.341a5.066 5.066 0 0 0-.805-1.05l-3.484-3.486ZM20 10.485c0-.163-.008-.325-.023-.485H15c-1.654 0-3-1.346-3-3V2.023A5.198 5.198 0 0 0 11.515 2H7C5.346 2 4 3.346 4 5v14c0 1.654 1.346 3 3 3h10c1.654 0 3-1.346 3-3v-8.515Z" />
    </g>
  </svg>
);

adminIcon.propTypes = {
  stroke: PropTypes.string,
};
