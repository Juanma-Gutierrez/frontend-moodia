import "./PostComponent.scss";
import PropTypes from "prop-types";
import { emojis } from "../../assets/Icons/EmojiIcons/EmojiList";

export const PostComponent = ({ title, entry, creationDate, score }) => {
  const emoji = emojis.find((e) => e.id === score)?.icon();

  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{entry}</p>
      <div className="date-container">
        <div className="date">{creationDate}</div>
        <div className="icon">{emoji}</div>
      </div>
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
  creationDate: PropTypes.string,
  score: PropTypes.number,
};
