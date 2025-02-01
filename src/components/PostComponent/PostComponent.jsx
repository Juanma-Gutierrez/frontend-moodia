import "./PostComponent.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { DeleteIcon } from "@assets/Icons/ButtonIcons/DeleteIcon";
import { EditIcon } from "@assets/Icons/ButtonIcons/EditIcon";
import { EditPostComponent } from "@components/EditPostComponent/EditPostComponent";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { emojis } from "@assets/Icons/EmojiIcons/EmojiList";
import { getFormattedDate } from "@services/utils/utils";
import { useAuthContext } from "@services/context/AuthContext";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useState } from "react";

export const PostComponent = ({ post, onDelete }) => {
  const { title, message, created_at, score, categories, idPost } = post;

  const { token } = useAuthContext();
  const { category, setKOScreenVisible } = useEnvironmentContext();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark");
  const emoji = emojis.find((e) => e.id === score)?.icon();
  const [postToEdit, setPostToEdit] = useState();
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

  const modalModel = new ModalModel({
    title: "Eliminar post",
    message: "¿Seguro que deseas eliminar este post?",
    button1: "Borrar",
    button2: "Cancelar",
    type: "confirm",
  });

  // Edit post
  const handleClickEdit = () => {
    console.log("Editar post:", post);
    setPostToEdit(post);
    setIsModalEditVisible(true);
    //onEdit(post);
  };

  const handleConfirmEdit = (updatedPost) => {
    console.log("handleConfirmEdit", updatedPost);

    // TODO:
    // Está llegando el nuevo post editado, hay que grabarlo
    // En EditPostComponent, hay que registrar el cambio en los chips
  };

  const handleCancelEdit = () => {
    console.log("handleCancelEdit");
    setIsModalEditVisible(false);
  };

  // Delete post
  const handleClickDelete = () => {
    setIsModalDeleteVisible(true);
  };

  const handleDeletePost = async () => {
    const response = await apiGenericRequest(`post/delete/${idPost}`, null, HttpMethod.DELETE, token);
    if (response.success) {
      onDelete(idPost);
    } else {
      console.error("Error al eliminar el post");
      setKOScreenVisible(true);
    }
    setIsModalDeleteVisible(false);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalDeleteVisible(false);
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
      {isModalDeleteVisible && (
        <ModalComponent modalModel={modalModel} onConfirm={handleDeletePost} onCancel={handleCloseModal} />
      )}

      {isModalEditVisible && (
        <EditPostComponent post={postToEdit} onConfirm={handleConfirmEdit} onCancel={handleCancelEdit} />
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
