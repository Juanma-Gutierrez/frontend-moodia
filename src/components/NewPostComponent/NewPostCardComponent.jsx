import "./NewPostCardComponent.scss";
import PropTypes from "prop-types";
import { ChipComponent } from "../ChipComponent/ChipComponent";
import { InputComponent } from "../InputComponent/InputComponent";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { editIcon } from "../../assets/Icons/ButtonIcons/EditIcon";
import { emojiIcon1 } from "../../assets/Icons/EmojiIcons/EmojiIcon1";
import { emojiIcon2 } from "../../assets/Icons/EmojiIcons/EmojiIcon2";
import { emojiIcon3 } from "../../assets/Icons/EmojiIcons/EmojiIcon3";
import { emojiIcon4 } from "../../assets/Icons/EmojiIcons/EmojiIcon4";
import { emojiIcon5 } from "../../assets/Icons/EmojiIcons/EmojiIcon5";
import { useState } from "react";
import { useEffect } from "react";

export const NewPostCardComponent = ({ category }) => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [categorySelected, setCategorySelected] = useState([]);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleEntryChange = (event) => {
    setEntry(event.target.value);
  };

  const emojis = [
    { id: 1, icon: emojiIcon1 },
    { id: 2, icon: emojiIcon2 },
    { id: 3, icon: emojiIcon3 },
    { id: 4, icon: emojiIcon4 },
    { id: 5, icon: emojiIcon5 },
  ];

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !entry.trim());
  }, [title, entry]);

  const handleClickChip = (chipValue) => {
    setCategorySelected((prevSelected) => {
      console.log("Chip pulsado", chipValue, prevSelected);
      if (prevSelected.includes(chipValue)) {
        // Si ya está seleccionado, se quita
        return prevSelected.filter((item) => item !== chipValue);
      } else {
        // Si no está seleccionado, se añade
        return [...prevSelected, chipValue].sort();
      }
    });
  };

  const handleClickPublishButton = () => {
    console.log("Publicar");
  };

  const handleEmojiClick = (emojiIndex) => {
    setSelectedEmoji(emojiIndex);
  };

  return (
    <div className="newPostCardComponent">
      <h3>Cuéntame lo que quieras {selectedEmoji}</h3>
      <InputComponent label="Título" value={title} placeholder="Introduce el título" onChange={handleTitleChange} />
      <InputComponent
        label="Entrada"
        placeholder="Introduce tu post diario"
        value={entry}
        type="message"
        onChange={handleEntryChange}
      />
      <div className="category-container">
        {category.map(
          (cat, index) => {
            return (
              <ChipComponent
                key={index}
                text={cat.name}
                onClick={() => handleClickChip(index)}
                isSelected={categorySelected.includes(index)}
              />
            );
          },
          [category]
        )}
      </div>
      <div className="publish-container">
        <div className="emoji-container">
          {emojis.map(({ id, icon }) => (
            <div
              key={id}
              className={`emoji ${selectedEmoji === id ? "selected" : ""}`}
              onClick={() => handleEmojiClick(id)}
            >
              {icon()}
            </div>
          ))}
        </div>
        <div className="button-container">
          <ButtonComponent
            text="Publicar"
            icon={editIcon}
            onClick={handleClickPublishButton}
            disabled={isButtonDisabled}
            colorClass="button-accept"
          />
        </div>
      </div>
    </div>
  );
};

NewPostCardComponent.propTypes = {
  category: PropTypes.array,
};
