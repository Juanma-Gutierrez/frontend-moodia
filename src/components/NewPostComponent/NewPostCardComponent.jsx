import "./NewPostCardComponent.scss";
import ModalModel from "../../components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ApiRequest } from "../../services/apiService/RequestModel";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { ChipComponent } from "../ChipComponent/ChipComponent";
import { EditIcon } from "../../assets/Icons/ButtonIcons/EditIcon";
import { HttpMethod } from "../../services/apiService/RequestModel";
import { InputComponent } from "../InputComponent/InputComponent";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { apiRequest } from "../../services/apiService/Api";
import { emojis } from "../../assets/Icons/EmojiIcons/EmojiList";
import { getFormattedDate } from "../../services/utils/utils";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

export const NewPostCardComponent = ({ onPostCreated, category }) => {
  const [categorySelected, setCategorySelected] = useState([]);
  const [emojiSelected, setEmojiSelected] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const { token } = useAuthContext();
  const [error, setError] = useState(false);
  const [modalModel, setModalModel] = useState(new ModalModel({ title: "", message: "" }));

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleModalOnClick = () => {
    setIsModalVisible(false);
    if (!error) {
      cleanPostCard();
      onPostCreated();
    }
  };

  const cleanPostCard = () => {
    setTitle("");
    setMessage("");
    setCategorySelected([]);
    setEmojiSelected(null);
  }

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !message.trim() || !emojiSelected);
  }, [title, message, emojiSelected]);

  const handleClickChip = (chipValue) => {
    setCategorySelected((prevSelected) => {
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
    const body = {
      title: title,
      message: message,
      creationDate: getFormattedDate(),
      score: emojiSelected,
      idExtendedUser: localStorage.getItem("userId"),
      category: categorySelected,
    };
    const request = new ApiRequest("/post/create", HttpMethod.POST, body, token);
    apiRequest(request).then((response) => {
      if (response.success) {
        setModalModel({
          title: "Creación",
          message: "Se ha grabado correctamente el post.",
          button1: "Aceptar",
          type: "info",
        });
      } else {
        setError(true);
        setModalModel(
          new ModalModel({
            title: "Error",
            message: "Hubo un problema al crear el post. Por favor, inténtalo de nuevo.",
            button1: "Cerrar",
            type: "warning",
          })
        );
        console.error(response.error);
      }
      setIsModalVisible(true);
    });
  };

  const handleEmojiClick = (emojiIndex) => {
    setEmojiSelected(emojiIndex);
  };

  return (
    <div className="newPostCardComponent">
      <h3>Cuéntame lo que quieras</h3>
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
          />
        </div>
      </div>
      {isModalVisible && <ModalComponent modalModel={modalModel} onClose={() => handleModalOnClick()} />}
    </div>
  );
};

NewPostCardComponent.propTypes = {
  category: PropTypes.array,
};
