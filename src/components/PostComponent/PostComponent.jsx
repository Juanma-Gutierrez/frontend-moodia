import "./PostComponent.scss";
import PropTypes from "prop-types";

export const PostComponent = ({ title, entry }) => {
  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{entry}</p>
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
};
