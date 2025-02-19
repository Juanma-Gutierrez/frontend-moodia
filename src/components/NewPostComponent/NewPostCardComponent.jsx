import "./NewPostCardComponent.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ButtonComponent } from "@components/ButtonComponent/ButtonComponent";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { EditIcon } from "@assets/Icons/ButtonIcons/EditIcon";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { InputComponent } from "@components/InputComponent/InputComponent";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { emojis } from "@assets/Icons/EmojiIcons/EmojiList";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

/**
 * NewPostCardComponent
 *
 * A component that provides a form for creating new posts. It includes input fields for the title and message,
 * a category selection via chips, and emoji selection. The component also handles the logic for enabling/disabling
 * the publish button, and displays a modal with a success or error message after a post is created.
 *
 * @param {Object} props - The component props.
 * @param {function} props.onPostCreated - A callback function that is triggered after a post is created.
 * @param {Array} props.category - An array of category objects to be used for category selection.
 *
 * @returns {JSX.Element} The rendered component.
 */
export const NewPostCardComponent = ({ onPostCreated, category }) => {
  const [categorySelected, setCategorySelected] = useState([]);
  const [emojiSelected, setEmojiSelected] = useState(null);
  const [error, setError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [modalModel, setModalModel] = useState(new ModalModel({ title: "", message: "" }));
  const [title, setTitle] = useState("");
  const { token, user, extendedUser } = useAuthContext();

  /**
   * handleTitleChange
   *
   * A function that updates the state of the post title whenever the input field value changes.
   * This function is triggered by the onChange event of the title input field.
   *
   * @param {Event} event - The event triggered by the title input change.
   * @returns {void} - This function does not return any value.
   */
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  /**
   * handleMessageChange
   *
   * A function that updates the state of the post message whenever the input field value changes.
   * This function is triggered by the onChange event of the message input field.
   *
   * @param {Event} event - The event triggered by the message input change.
   * @returns {void} - This function does not return any value.
   */
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  /**
   * handleConfirm
   *
   * A function that handles the confirmation action after the modal is displayed.
   * It hides the modal and triggers the post creation callback if no error occurred.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleConfirm = () => {
    setIsModalVisible(false);
    if (!error) {
      cleanPostCard();
      onPostCreated();
    }
  };

  /**
   * cleanPostCard
   *
   * A function that resets the state variables related to the post creation form.
   * This is called after successfully creating a post or when the modal is confirmed.
   *
   * @returns {void} - This function does not return any value.
   */
  const cleanPostCard = () => {
    setTitle("");
    setMessage("");
    setCategorySelected([]);
    setEmojiSelected(null);
  };

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !message.trim() || !emojiSelected);
  }, [title, message, emojiSelected]);

  /**
   * handleClickChip
   *
   * A function that updates the state of the selected categories when a category chip is clicked.
   * It toggles the selected state of a category.
   *
   * @param {number} idCategory - The ID of the category that was clicked.
   * @returns {void} - This function does not return any value.
   */
  const handleClickChip = (idCategory) => {
    setCategorySelected((prevSelected) => {
      if (prevSelected.includes(idCategory)) {
        // Si ya está seleccionado, se quita
        return prevSelected.filter((item) => item !== idCategory);
      } else {
        // Si no está seleccionado, se añade
        return [...prevSelected, idCategory].sort();
      }
    });
  };

  /**
   * handleEmojiClick
   *
   * A function that updates the state of the selected emoji when an emoji is clicked.
   *
   * @param {number} emojiIndex - The index of the emoji that was clicked.
   * @returns {void} - This function does not return any value.
   */
  const handleEmojiClick = (emojiIndex) => {
    setEmojiSelected(emojiIndex);
  };

  /**
   * handleClickPublishButton
   *
   * A function that handles the post creation when the publish button is clicked.
   * It sends a POST request to create the post, and based on the response, it displays a success or error modal.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleClickPublishButton = async () => {
    const body = {
      title,
      message,
      score: emojiSelected,
      idExtendedUser: extendedUser.idExtendedUser,
      category: categorySelected,
    };
    const response = await apiGenericRequest("post/create", body, HttpMethod.POST, token);
    switch (response.success) {
      case true:
        setModalModel({
          title: "Creación",
          message: "Se ha grabado correctamente el post.",
          button1: "Aceptar",
          type: "info",
        });
        break;
      case false:
        setError(true);
        setModalModel(
          new ModalModel({
            title: "Error",
            message: "Hubo un problema al crear el post. Por favor, inténtalo de nuevo pasados unos minutos.",
            button1: "Cerrar",
            type: "warning",
          })
        );
        console.error(response.error);
        break;
    }
    setIsModalVisible(true);
  };

  return (
    <div className="newPostCardComponent">
      <h1>Cuéntame lo que quieras, {user.name}</h1>
      <div className="input-container">
        <InputComponent value={title} placeholder="Introduce el título" onChange={handleTitleChange} />
        <InputComponent
          placeholder="Introduce tu post diario"
          value={message}
          type="message"
          onChange={handleMessageChange}
        />
      </div>
      <div className="category-container">
        {category.map(
          (cat) => {
            return (
              <ChipComponent
                key={cat.idCategory}
                text={cat.name}
                onClick={() => handleClickChip(cat.idCategory)}
                isSelected={categorySelected.includes(cat.idCategory)}
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
              className={`emoji ${emojiSelected === id ? "selected" : ""}`}
              onClick={() => handleEmojiClick(id)}
            >
              {icon()}
            </div>
          ))}
        </div>
        <div className="button-container">
          <ButtonComponent
            text="Publicar"
            icon={EditIcon}
            onClick={handleClickPublishButton}
            disabled={isButtonDisabled}
            type="info-accept"
            width="full"
          />
        </div>
      </div>
      {isModalVisible && <ModalComponent modalModel={modalModel} onConfirm={handleConfirm} />}{" "}
    </div>
  );
};

NewPostCardComponent.propTypes = {
  category: PropTypes.array,
};
