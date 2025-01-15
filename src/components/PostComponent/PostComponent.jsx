import "./PostComponent.scss";
import PropTypes from "prop-types";

export const PostComponent = ({ title, entry, creationDate, score }) => {
  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{entry}</p>
      <p className="post-date">{creationDate} - {score}</p>
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
  creationDate: PropTypes.string,
  score: PropTypes.number,
};
