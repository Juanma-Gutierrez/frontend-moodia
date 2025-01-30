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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Modal
  const handleConfirm = () => {
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
  };

  useEffect(() => {
    setIsButtonDisabled(!title.trim() || !message.trim() || !emojiSelected);
  }, [title, message, emojiSelected]);

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

  const handleEmojiClick = (emojiIndex) => {
    setEmojiSelected(emojiIndex);
  };

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
      <h3>Cuéntame lo que quieras, {user.name}</h3>
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
