import "./Post.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { InspiringPhraseComponent } from "@components/InspiringPhraseComponent/InspiringPhraseComponent";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { NewPostComponent } from "@components/NewPostComponent/NewPostComponent";
import { PostComponent } from "@components/PostComponent/PostComponent";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";
import { useNavigate } from "react-router-dom";
import { SnackbarComponentTypes } from "@components/SnackbarComponent/SnackbarComponentTypes";

export default function Post() {
  const { setLogoIsLoading } = useEnvironmentContext();
  const { extendedUser, token, setToken } = useAuthContext();
  const navigate = useNavigate();
  const [shouldReloadPosts, setShouldReloadPosts] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const [isModalKOVisible, setIsModalKOVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [isInspiringPhraseVisible, setIsInspiringPhraseVisible] = useState(false);
  const [inspiringPhraseModel, setInspiringPhraseModel] = useState(null);

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
      setLogoIsLoading(true);
      const response = await apiGenericRequest("post/list", null, HttpMethod.GET, token);
      switch (response.success) {
        case true:
          setPosts(response.data.data);
          break;
        case false:
          setIsModalKOVisible(true);
          setupSnackbar("Error: " + response.error, SnackbarComponentTypes.ERROR);
          break;
      }
      setLogoIsLoading(false);
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
      setupSnackbar("Error: " + response.error, SnackbarComponentTypes.ERROR);
    }
  };

  const getInspiringPhrase = async () => {
    setIsInspiringPhraseVisible(false);
    setLogoIsLoading(true);
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
      setupSnackbar("Error: " + response.error, SnackbarComponentTypes.ERROR);
    }
    setLogoIsLoading(false);
  };

  // Snackbar
  const setupSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setIsSnackbarVisible(true);
  };
  const handleClickSnackbar = () => {
    setIsSnackbarVisible(false);
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
      {isSnackbarVisible && (
        <SnackbarComponent message={snackbarMessage} type={snackbarType} onClick={handleClickSnackbar} />
      )}
    </div>
  );
}
