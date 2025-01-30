import "./Post.scss";
import ModalModel from "../../components/ModalComponent/ModalModel";
import { HttpMethod } from "../../services/apiService/HttpMethod";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { NewPostComponent } from "../../components/NewPostComponent/NewPostComponent";
import { PostComponent } from "../../components/PostComponent/PostComponent";
import { apiGenericRequest } from "../../services/apiService/ApiGenericRequest";
import { formatDate } from "../../services/extensions/Extensions";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shouldReloadPosts, setShouldReloadPosts] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const { token } = useAuthContext();

  const modalModel = new ModalModel({
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
          setIsModalVisible(true);
          break;
      }
    }
  };

  // Modal
  const handleConfirm = () => {
    setIsModalVisible(false);
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

  return (
    <div className="post-container">
      <div className="post">
        <NewPostComponent onPostCreated={() => setShouldReloadPosts(true)} />
        {Array.isArray(posts) &&
          posts.map(
            (post, index) => {
              return <PostComponent key={index} post={post} />;
            },
            [posts]
          )}
      </div>
      {isModalVisible && <ModalComponent modalModel={modalModel} onConfirm={handleConfirm} />}{" "}
    </div>
  );
}
