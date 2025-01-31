import "./Post.scss";
import ModalModel from "@components/ModalComponent/ModalModel";
import { HttpMethod } from "@services/apiService/HttpMethod";
import { ModalComponent } from "@components/ModalComponent/ModalComponent";
import { NewPostComponent } from "@components/NewPostComponent/NewPostComponent";
import { PostComponent } from "@components/PostComponent/PostComponent";
import { apiGenericRequest } from "@services/apiService/ApiGenericRequest";
import { formatDate } from "@services/extensions/Extensions";
import { useAuthContext } from "@services/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [isModalKOVisible, setIsModalKOVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shouldReloadPosts, setShouldReloadPosts] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const { token } = useAuthContext();

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

  // Modal
  const handleConfirm = () => {
    setIsModalKOVisible(false);
    console.log(Date());
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getPostList(token);
    }
  }, [token, navigate]);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (shouldReloadPosts) {
      getPostList(token);
      setShouldReloadPosts(false);
    }
  }, [shouldReloadPosts]);

  const handleDelete = (idPost) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.idPost !== idPost));
    setIsModalDeleteVisible(true);
  };

  const handleCloseDelete = (idPost) => {
    setIsModalDeleteVisible(false);
  };

  return (
    <div className="post-container">
      <div className="post">
        <NewPostComponent onPostCreated={() => setShouldReloadPosts(true)} />
        {Array.isArray(posts) &&
          posts.map(
            (post, index) => {
              return <PostComponent key={index} post={post} onDelete={handleDelete} />;
            },
            [posts]
          )}
      </div>
      {isModalKOVisible && <ModalComponent modalModel={modalModelKO} onConfirm={handleConfirm} />}
      {isModalDeleteVisible && <ModalComponent modalModel={modalModelDelete} onConfirm={handleCloseDelete} />}
    </div>
  );
}
