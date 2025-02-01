import "./EditPostComponent.scss";

import { emojis } from "@assets/Icons/EmojiIcons/EmojiList";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { InputComponent } from "@components/InputComponent/InputComponent";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export const EditPostComponent = ({ post, onConfirm, onCancel }) => {
  const { title: initialTitle, message: initialMessage, score: initialScore, categories: initialCategories } = post;
  const { category } = useEnvironmentContext();

  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [categories, setCategories] = useState(initialCategories);
  const [score, setScore] = useState(initialScore);

  if (!post) return null;

  const handleForm = (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      message,
      score,
      categories,
    };
    onConfirm(updatedPost);
  };

  const handleEmojiClick = (emojiIndex) => {
    console.log(emojiIndex);
    setScore(emojiIndex);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h3>Editar Post</h3>
        <form>
          <InputComponent placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <InputComponent
            placeholder="Post diario"
            value={message}
            type="message"
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <div className="categories">
            {category.map((cat) => {
              const isSelected = categories.some(
                (selectedCat) => Number(selectedCat.idCategory) === Number(cat.idCategory)
              );
              return (
                <ChipComponent
                  key={cat.idCategory}
                  text={cat.name}
                  isClickable={true}
                  isSelected={isSelected}
                  onClick={() => {
                    setCategories((prevSelected) => {
                      return isSelected
                        ? prevSelected.filter((item) => Number(item.idCategory) !== Number(cat.idCategory))
                        : [...prevSelected, { idCategory: cat.idCategory, name: cat.name }];
                    });
                  }}
                />
              );
            })}
          </div>
          <div className="emoji-container">
            {emojis.map(({ id, icon }) => (
              <div key={id} className={`emoji ${score === id ? "selected" : ""}`} onClick={() => handleEmojiClick(id)}>
                {icon()}
              </div>
            ))}
          </div>

          <div className="buttonsContainer">
            <ButtonComponent type="info-accept" text="Aceptar" onClick={handleForm} />
            <ButtonComponent type="confirm-cancel" onClick={onCancel} text="Cancelar" />
          </div>
        </form>
      </div>
    </div>
  );
};

EditPostComponent.propTypes = {
  post: PropTypes.any.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
