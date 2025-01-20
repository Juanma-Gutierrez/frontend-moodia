import "./PostComponent.scss";
import PropTypes from "prop-types";
import { emojis } from "../../assets/Icons/EmojiIcons/EmojiList";
import { EditIcon } from "../../assets/Icons/ButtonIcons/EditIcon";
import { DeleteIcon } from "../../assets/Icons/ButtonIcons/DeleteIcon";

export const PostComponent = ({ title, entry, creationDate, score }) => {
  const emoji = emojis.find((e) => e.id === score)?.icon();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark");

  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{entry}</p>
      <div className="footer-container">
        <div className="date">{creationDate}</div>
        <div className="icon">{emoji}</div>
        <div className="icon-container">
          <EditIcon stroke={stroke} />
        </div>
        <div className="icon-container">
          <DeleteIcon stroke={stroke} />
        </div>
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
