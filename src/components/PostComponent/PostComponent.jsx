import "./PostComponent.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { DeleteIcon } from "@assets/Icons/ButtonIcons/DeleteIcon";
import { EditIcon } from "@assets/Icons/ButtonIcons/EditIcon";
import { HttpMethod } from "../../services/apiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { emojis } from "@assets/Icons/EmojiIcons/EmojiList";
import { getFormattedDate } from "@services/utils/utils";
import { useAuthContext } from "@services/context/AuthContext";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useState } from "react";

export const PostComponent = ({ post, onDelete }) => {
  const { title, message, created_at, score, categories, idPost } = post;

  const emoji = emojis.find((e) => e.id === score)?.icon();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { category, setKOScreenVisible } = useEnvironmentContext();
  const { token } = useAuthContext();

  const modalModel = new ModalModel({
    title: "Eliminar post",
    message: "¿Seguro que deseas eliminar este post?",
    button1: "Borrar",
    button2: "Cancelar",
    type: "confirm",
  });

  const handleClickEdit = () => {
    console.log("Editar post:", title);
  };

  const handleClickDelete = () => {
    setIsModalVisible(true);
  };

  const handleDeletePost = async () => {
    const response = await apiGenericRequest(`post/delete/${idPost}`, null, HttpMethod.DELETE, token);
    if (response.success) {
      onDelete(idPost);
    } else {
      console.error("Error al eliminar el post");
      setKOScreenVisible(true);
    }
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="post-card-component">
      <h3>{title}</h3>
      <p>{message}</p>
      <div className="footer-container">
        <div className="start">
          <div className="date">{getFormattedDate("dd/MM/yyyy", created_at)}</div>
          <div>
            {categories && Array.isArray(categories) && categories.length > 0 ? (
              categories.map((postCategory) => {
                const matchingCategory = category.find(
                  (cat) => Number(cat.idCategory) === Number(postCategory.idCategory)
                );
                return matchingCategory ? (
                  <ChipComponent key={matchingCategory.idCategory} text={matchingCategory.name} isClickable={false} />
                ) : (
                  <span>No se encontró categoría para ID: {postCategory.idCategory}</span>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="end">
          <div className="icon">{emoji}</div>
          <div className="icon-container" onClick={handleClickEdit}>
            <EditIcon stroke={stroke} />
          </div>
          <div className="icon-container" onClick={handleClickDelete}>
            <DeleteIcon stroke={stroke} />
          </div>
        </div>
      </div>
      {isModalVisible && (
        <ModalComponent modalModel={modalModel} onConfirm={handleDeletePost} onCancel={handleCloseModal} />
      )}
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
  created_at: PropTypes.string,
  score: PropTypes.number,
};
