import "./Post.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import { HttpMethod } from "@services/ApiService/HttpMethod";
import { InspiringPhraseComponent } from "@components/InspiringPhraseComponent/InspiringPhraseComponent";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { NewPostComponent } from "@components/NewPostComponent/NewPostComponent";
import { PostComponent } from "@components/PostComponent/PostComponent";
import { SnackbarComponent } from "@components/SnackbarComponent/SnackbarComponent";
import { SnackbarComponentTypes } from "@components/SnackbarComponent/SnackbarComponentTypes";
import { apiGenericRequest } from "@services/ApiService/ApiGenericRequest";
import { useAuthContext } from "@services/Context/AuthContext";
import { useEffect, useState } from "react";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";
import { useNavigate } from "react-router-dom";

/**
 * Checks if an inspiring phrase should be shown based on the user's last visit.
 * @returns {void} - No return value.
 */
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

  /**
   * Runs when the component is mounted to check if an inspiring phrase should be shown.
   * @returns {void} - No return value.
   */
  useEffect(() => {
    checkInpiringPhrase();
  }, []);

  /**
   * Checks if an inspiring phrase should be shown based on the user's last visit date and visibility settings.
   * If a new phrase should be shown, it fetches a new inspiring phrase and updates the local storage.
   * @returns {void} - No return value.
   */
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

  /**
   * Modal model for successful post deletion.
   * @type {ModalModel} - An instance of the ModalModel class with predefined properties.
   */
  const modalModelDelete = new ModalModel({
    title: "Borrado",
    message: "Se ha eliminado correctamente el post.",
    button1: "Aceptar",
    type: "info",
  });

  /**
   * Modal model for errors when downloading posts.
   * @type {ModalModel} - An instance of the ModalModel class with predefined properties.
   */
  const modalModelKO = new ModalModel({
    title: "Error",
    message: "Hay un error al descargar los post. Inténtalo más tarde.",
    button1: "Aceptar",
    type: "warning",
  });

  /**
   * Makes an API request to get the list of posts and updates the component state.
   * @param {string} token - The authentication token of the user.
   * @returns {void} - No return value.
   */
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

  /**
   * Handles the confirmation of the "KO" modal, which involves logging the user out.
   * It hides the modal, clears the token from state and localStorage, and redirects to the login page.
   * @returns {void} - No return value.
   */
  const handleConfirmKO = () => {
    setIsModalKOVisible(false);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  /**
   * This effect runs on component mount and whenever the token changes.
   * It checks if a valid token exists in localStorage. If not, redirects to the login page.
   * If a token is found, it fetches the post list using the `getPostList` function.
   * @returns {void} - No return value.
   */
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getPostList(token);
    }
  }, [token, navigate]);

  /**
   * This effect is triggered when `shouldReloadPosts` changes.
   * It fetches the post list again if `shouldReloadPosts` is true and a valid token is available.
   * After fetching, it sets `shouldReloadPosts` to false.
   * @returns {void} - No return value.
   */
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (shouldReloadPosts && token) {
      getPostList(token);
      setShouldReloadPosts(false);
    }
  }, [shouldReloadPosts]);

  /**
   * Handles the post edit action.
   * It sets `shouldReloadPosts` to true, triggering the reload of the post list.
   * @returns {void} - No return value.
   */
  const handleEdit = () => {
    setShouldReloadPosts(true);
  };

  /**
   * Handles the deletion of a post by its ID.
   * It filters out the post with the given `idPost` from the `posts` state and shows the delete confirmation modal.
   * @param {number} idPost - The ID of the post to delete.
   * @returns {void} - No return value.
   */
  const handleDelete = (idPost) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.idPost !== idPost));
    setIsModalDeleteVisible(true);
  };

  /**
   * Closes the delete confirmation modal.
   * @returns {void} - No return value.
   */
  const handleCloseDelete = () => {
    setIsModalDeleteVisible(false);
  };

  /**
   * Handles the click event on the inspiring phrase, hiding it and removing its ID from the user's data.
   * It also updates localStorage to ensure the phrase is no longer visible.
   * @returns {void} - No return value.
   */
  const handleInpiringPhraseClick = () => {
    localStorage.setItem("inspiringPhraseVisible", false);
    setIsInspiringPhraseVisible(false);
    deleteCustomIdInspirationPhrase();
  };

  /**
   * Deletes a specific inspiring phrase ID from the user's data.
   * @returns {void} - No return value.
   */
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

  /**
   * Fetches an inspiring phrase from the API and displays it to the user.
   * @returns {void} - No return value.
   */
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

  /**
   * Sets up the snackbar message and type, and makes the snackbar visible.
   * This function is used to show a notification with a message and a type (e.g., error, success).
   * @param {string} message - The message to display in the snackbar.
   * @param {string} type - The type of the snackbar (e.g., "error", "success").
   * @returns {void} - No return value.
   */
  const setupSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setIsSnackbarVisible(true);
  };

  /**
   * Closes the snackbar when clicked.
   * This function is used to hide the snackbar from the UI.
   * @returns {void} - No return value.
   */
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
