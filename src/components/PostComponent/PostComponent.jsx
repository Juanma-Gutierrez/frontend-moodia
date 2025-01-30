import "./PostComponent.scss";
import PropTypes from "prop-types";
import ModalModel from "@components/ModalComponent/ModalModel";
import { emojis } from "@assets/Icons/EmojiIcons/EmojiList";
import { EditIcon } from "@assets/Icons/ButtonIcons/EditIcon";
import { DeleteIcon } from "@assets/Icons/ButtonIcons/DeleteIcon";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "@services/context/AuthContext";
import { ChipComponent } from "@components/ChipComponent/ChipComponent";
import { getFormattedDate } from "../../services/utils/utils";

export const PostComponent = ({ post }) => {
  const { title, message, created_at, score, categories, idPost } = post;

  const emoji = emojis.find((e) => e.id === score)?.icon();
  const stroke = getComputedStyle(document.documentElement).getPropertyValue("--secondary-dark");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { category, employment, setKOScreenVisible } = useEnvironmentContext();
  const { token } = useAuthContext();
  const [forceRender, setForceRender] = useState(false);

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
    console.log("Eliminar post:", title);
    setIsModalVisible(true);
  };

  const handleDeletePost = async () => {
    console.log("Post eliminado:", title);
    const response = await apiGenericRequest(`post/delete/${idPost}`, null, "DELETE", setKOScreenVisible, token);
    if (response.success) {
      console.log("Post eliminado exitosamente");
      // Aquí podrías actualizar el estado o realizar cualquier otra acción necesaria
    } else {
      console.error("Error al eliminar el post");
    }
    setIsModalVisible(false);
  };

  const handleCloseModal = () => {
    console.log("Modal cerrada");
    setIsModalVisible(false);
  };

  useEffect(() => {
    setForceRender((prev) => !prev);
  }, [categories, category]);

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
    </div>
  );
};

PostComponent.propTypes = {
  title: PropTypes.string,
  entry: PropTypes.string,
  created_at: PropTypes.string,
  score: PropTypes.number,
};
