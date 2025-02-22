import "./PostComponent.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import PropTypes from "prop-types";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { DeleteIcon } from "@assets/icons/ButtonIcons/DeleteIcon";
import { EditIcon } from "@assets/icons/ButtonIcons/EditIcon";
import { EditPostComponent } from "@components/EditPostComponent/EditPostComponent";
import { HttpMethod } from "@services/ApiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { apiGenericRequest } from "@services/ApiService/ApiGenericRequest";
import { emojis } from "@assets/icons/EmojiIcons/EmojiList";
import { getFormattedDate } from "@services/Utils/Utils";
import { useAuthContext } from "@services/Context/AuthContext";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";
import { useState } from "react";

/**
 * PostComponent
 *
 * A component that displays an individual post with the title, message, categories, and score (emoji).
 * The component also provides functionality to edit and delete the post. It includes modals for confirmation
 * before performing these actions. The component is used to present posts created by users.
 *
 * @param {Object} post - The post object containing the details of the post (title, message, categories, etc.).
 * @param {Function} onEdit - Callback function to call when the post is successfully edited.
 * @param {Function} onDelete - Callback function to call when the post is successfully deleted.
 * @returns {JSX.Element} The rendered post component.
 */
export const PostComponent = ({ post, onEdit, onDelete }) => {
  const { title, message, created_at, score, categories, idPost } = post;
  const { token } = useAuthContext();
  const { category, setKOScreenVisible } = useEnvironmentContext();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--primary-dark");
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

  /**
   * handleClickEdit
   *
   * A function that triggers the display of the edit modal. It sets the current post data for editing.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleClickEdit = () => {
    setPostToEdit(post);
    setIsModalEditVisible(true);
  };

  /**
   * handleConfirmEdit
   *
   * A function that handles the post edit confirmation. It sends the updated post data to the server
   * and updates the state accordingly based on the success response.
   *
   * @param {Object} updatedPost - The updated post data after editing.
   * @returns {void} - This function does not return any value.
   */
  const handleConfirmEdit = async (updatedPost) => {
    const body = {
      title: updatedPost.title,
      message: updatedPost.message,
      score: updatedPost.score,
      idExtendedUser: updatedPost.idExtendedUser,
      category: updatedPost.categories,
    };

    const response = await apiGenericRequest(`post/update/${idPost}`, body, HttpMethod.PUT, token);
    if (response.success) {
      setIsModalEditVisible(false);
      onEdit();
    } else {
      console.error("Error al eliminar el post");
    }
  };

  /**
   * handleCancelEdit
   *
   * A function that cancels the post editing process by hiding the edit modal.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleCancelEdit = () => {
    setIsModalEditVisible(false);
  };

  /**
   * handleClickDelete
   *
   * A function that triggers the display of the delete confirmation modal.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleClickDelete = () => {
    setIsModalDeleteVisible(true);
  };

  /**
   * handleDeletePost
   *
   * A function that handles the deletion of the post. It sends a delete request to the server
   * and calls the `onDelete` callback if successful.
   *
   * @returns {void} - This function does not return any value.
   */
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

  /**
   * handleCloseModal
   *
   * A function that closes the delete modal without performing any action.
   *
   * @returns {void} - This function does not return any value.
   */
  const handleCloseModal = () => {
    setIsModalDeleteVisible(false);
  };

  return (
    <div className={`post-card-component score-${score}`}>
      <h3 className="postComponent-title">{title}</h3>
      <p className="postComponent-message">{message}</p>
      <div className="footer-container">
        <div className="start">
          <div className="chips-container">
            {categories && Array.isArray(categories) && categories.length > 0 ? (
              categories.map((postCategory) => {
                const matchingCategory = category.find(
                  (cat) => Number(cat.idCategory) === Number(postCategory.idCategory)
                );
                return matchingCategory ? (
                  <ChipComponent
                    key={matchingCategory.idCategory}
                    text={matchingCategory.name}
                    isClickable={false}
                    isSelected={true}
                  />
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
          <div className="date">{getFormattedDate("dd/MM/yyyy", created_at)}</div>
          <div className="emoji">{emoji}</div>
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
