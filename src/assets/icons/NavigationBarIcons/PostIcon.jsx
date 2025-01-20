import PropTypes from "prop-types";

export const PostIcon = ({ stroke }) => (
  <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24">
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 3H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 4.52 5 5.08 5 6.2v11.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C6.52 21 7.08 21 8.2 21H10m3-18 6 6m-6-6v4.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C13.76 9 14.04 9 14.6 9H19m0 0v1M9 17h2.5M9 13h5M9 9h1m4 12 2.025-.405c.177-.035.265-.053.347-.085a.994.994 0 0 0 .207-.111c.073-.05.136-.114.264-.242L21 16a1.414 1.414 0 1 0-2-2l-4.157 4.157a2.098 2.098 0 0 0-.242.264.994.994 0 0 0-.11.207c-.033.082-.05.17-.086.347L14 21Z"
      />
    </g>
  </svg>
);

PostIcon.propTypes = {
  stroke: PropTypes.string,
};
