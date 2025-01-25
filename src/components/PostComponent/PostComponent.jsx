import "./PostComponent.scss";
import PropTypes from "prop-types";
import { emojis } from "../../assets/Icons/EmojiIcons/EmojiList";
import { EditIcon } from "../../assets/Icons/ButtonIcons/EditIcon";
import { DeleteIcon } from "../../assets/Icons/ButtonIcons/DeleteIcon";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";
import { ChipComponent } from "../ChipComponent/ChipComponent";

export const PostComponent = ({ title, entry, creationDate, score, categories }) => {
  const emoji = emojis.find((e) => e.id === score)?.icon();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark");
  const { category } = useEnvironmentContext();

  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{entry}</p>
      <div className="footer-container">
        <div className="start">
          {categories && Array.isArray(categories) && categories.length > 0 ? (
            categories.map((postCategory) => {
              const matchingCategory = category.find((cat) => cat.idCategory === postCategory.idCategory);
              return matchingCategory ? (
                <ChipComponent key={matchingCategory.idCategory} text={matchingCategory.name} isClickable={false} />
              ) : null;
            })
          ) : (
            <></>
          )}
        </div>
        <div className="end">
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
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
  creationDate: PropTypes.string,
  score: PropTypes.number,
};
