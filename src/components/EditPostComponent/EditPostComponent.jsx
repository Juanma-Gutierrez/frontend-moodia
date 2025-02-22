import "./EditPostComponent.scss";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { InputComponent } from "@components/InputComponent/InputComponent";
import { emojis } from "@assets/icons/EmojiIcons/EmojiList";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";

/**
 * EditPostComponent
 *
 * A modal component that allows users to edit a post, including its title, message, score, and categories.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.post - The post data to be edited.
 * @param {Function} props.onConfirm - Callback function triggered when the post is updated.
 * @param {Function} props.onCancel - Callback function triggered when the editing is canceled.
 * @returns {JSX.Element|null} - Returns the modal component or null if no post is provided.
 */
export const EditPostComponent = ({ post, onConfirm, onCancel }) => {
  const { title: initialTitle, message: initialMessage, score: initialScore, categories: initialCategories } = post;
  const { category } = useEnvironmentContext();
  const [title, setTitle] = useState(initialTitle);
  const [message, setMessage] = useState(initialMessage);
  const [categories, setCategories] = useState(initialCategories);
  const [score, setScore] = useState(initialScore);

  if (!post) return null;

  /**
   * handleForm
   *
   * Handles the form submission, updating the post with the new values and triggering the onConfirm callback.
   *
   * @param {Event} e - The form submit event.
   * @returns {void}
   */
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

  /**
   * handleEmojiClick
   *
   * Updates the score state when an emoji is clicked.
   *
   * @param {number} emojiIndex - The index of the selected emoji.
   * @returns {void}
   */
  const handleEmojiClick = (emojiIndex) => {
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
          <div className="footer-container">
            <div className="emoji-container">
              {emojis.map(({ id, icon }) => (
                <div
                  key={id}
                  className={`emoji ${score === id ? "selected" : ""}`}
                  onClick={() => handleEmojiClick(id)}
                >
                  {icon()}
                </div>
              ))}
            </div>
            <div className="buttonsContainer">
              <ButtonComponent type="info-accept" text="Aceptar" onClick={handleForm} />
              <ButtonComponent type="confirm-cancel" text="Cancelar" onClick={onCancel} />
            </div>
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
