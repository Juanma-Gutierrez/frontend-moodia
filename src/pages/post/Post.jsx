import "./Post.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { NewPostComponent } from "@components/NewPostComponent/NewPostComponent";
import { PostComponent } from "@components/PostComponent/PostComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InspiringPhraseComponent } from "@components/InspiringPhraseComponent/InspiringPhraseComponent";

export default function Post() {
  const [isModalKOVisible, setIsModalKOVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isInspiringPhraseVisible, setIsInspiringPhraseVisible] = useState(false);
  const [inspiringPhraseModel, setInspiringPhraseModel] = useState(null);
  const [posts, setPosts] = useState([]);
  const [shouldReloadPosts, setShouldReloadPosts] = useState(false);
  const navigate = useNavigate();
  const { extendedUser, token, setToken } = useAuthContext();

  useEffect(() => {
    checkInpiringPhrase();
  }, []);

  const checkInpiringPhrase = () => {
    const localLastVisitDate = localStorage.getItem("lastVisitDate");
    const today = new Date().toISOString().split("T")[0];
    const localInspiringPhraseVisible = localStorage.getItem("inspiringPhraseVisible");

    if (!localLastVisitDate || localLastVisitDate < today || localInspiringPhraseVisible == "true") {
      getInspiringPhrase();
      localStorage.setItem("lastVisitDate", today);
      localStorage.setItem("inspiringPhraseVisible", true);
    }
  };

  const modalModelDelete = new ModalModel({
    title: "Borrado",
    message: "Se ha eliminado correctamente el post.",
    button1: "Aceptar",
    type: "info",
  });

  const modalModelKO = new ModalModel({
    title: "Error",
    message: "Hay un error al descargar los post. Inténtalo más tarde.",
    button1: "Aceptar",
    type: "warning",
  });

  const getPostList = async (token) => {
    if (token) {
      const response = await apiGenericRequest("post/list", null, HttpMethod.GET, token);
      switch (response.success) {
        case true:
          setPosts(response.data.data);
          break;
        case false:
          console.error(response.error);
          setIsModalKOVisible(true);
          break;
      }
    }
  };

  // Modal KO
  const handleConfirmKO = () => {
    setIsModalKOVisible(false);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Guard
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getPostList(token);
    }
  }, [token, navigate]);

  // Reload of posts
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (shouldReloadPosts && token) {
      getPostList(token);
      setShouldReloadPosts(false);
    }
  }, [shouldReloadPosts]);

  // Edit post
  const handleEdit = () => {
    // Actualizar pantalla de post
    console.log("entra en editar");
    setShouldReloadPosts(true);
  };

  // Delete post
  const handleDelete = (idPost) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.idPost !== idPost));
    setIsModalDeleteVisible(true);
  };

  const handleCloseDelete = () => {
    setIsModalDeleteVisible(false);
  };

  // Insipiring Phrase
  const handleInpiringPhraseClick = () => {
    localStorage.setItem("inspiringPhraseVisible", false);
    setIsInspiringPhraseVisible(false);
    deleteCustomIdInspirationPhrase();
  };

  const deleteCustomIdInspirationPhrase = async () => {
    let extendedUserWithoutInspiringPhrase = extendedUser;
    extendedUserWithoutInspiringPhrase.idInspiringPhrase = null;
    const response = await apiGenericRequest(
      "extended_user/update",
      extendedUserWithoutInspiringPhrase,
      HttpMethod.POST,
      token
    );
    if (response.error) {
      console.error("Error al eliminar frase inspiradora de extended_user", response.error);
    }
  };

  const getInspiringPhrase = async () => {
    setIsInspiringPhraseVisible(false);
    const response = await apiGenericRequest("inspiring_phrase/get", null, HttpMethod.POST, null);
    if (response.success) {
      const phrases = response.data.data;
      if (phrases.length > 0) {
        let idInspiringPhraseToSearch = extendedUser.idInspiringPhrase
          ? extendedUser.idInspiringPhrase - 1
          : Math.floor(Math.random() * phrases.length);
        setInspiringPhraseModel(phrases[idInspiringPhraseToSearch]);
        setIsInspiringPhraseVisible(true);
      }
    } else {
      console.error("Error al obtener frases inspiradoras:", response.error);
    }
  };

  return (
    <div className="post-container">
      <div className="post">
        {isInspiringPhraseVisible && (
          <InspiringPhraseComponent inspiringPhrase={inspiringPhraseModel} onClick={handleInpiringPhraseClick} />
        )}
        <NewPostComponent onPostCreated={() => setShouldReloadPosts(true)} />
        {Array.isArray(posts) &&
          posts.map(
            (post, index) => {
              return <PostComponent key={index} post={post} onEdit={handleEdit} onDelete={handleDelete} />;
            },
            [posts]
          )}
      </div>
      {isModalKOVisible && <ModalComponent modalModel={modalModelKO} onConfirm={handleConfirmKO} />}
      {isModalDeleteVisible && <ModalComponent modalModel={modalModelDelete} onConfirm={handleCloseDelete} />}
    </div>
  );
}
