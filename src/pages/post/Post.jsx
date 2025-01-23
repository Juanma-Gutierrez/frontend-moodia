import "./Post.scss";
import ModalModel from "../../components/ModalComponent/ModalModel";
import { ApiRequest } from "../../services/apiService/RequestModel";
import { HttpMethod } from "../../services/apiService/RequestModel";
import { ModalComponent } from "../../components/ModalComponent/ModalComponent";
import { NewPostComponent } from "../../components/NewPostComponent/NewPostComponent";
import { PostComponent } from "../../components/PostComponent/PostComponent";
import { apiRequest } from "../../services/apiService/Api";
import { formatDate } from "../../services/extensions/Extensions";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";


export default function Post() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [shouldReloadPosts, setShouldReloadPosts] = useState(false);
  const navigate = useNavigate();
  const { token } = useAuthContext();

  const modalModel = new ModalModel({
    title: "Error",
    message: "Hay un error al descargar los post. Inténtalo más tarde.",
    button1: "Aceptar",
    type: "warning",
  });

  const getPostList = (token) => {
    const request = new ApiRequest("/post/list", HttpMethod.GET, null, token);
    apiRequest(request).then((response) => {
      if (response.success) {
        setPosts(response.data.data);
      } else {
        console.error(response.error);
        setIsModalVisible(true);
      }
    });
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
              return (
                <PostComponent
                  key={index}
                  title={post.title}
                  entry={post.message}
                  creationDate={formatDate(post.created_at, "dd/MM/yyyy")}
                  score={post.score}
                  categories={post.categories}
                />
              );
            },
            [posts]
          )}
      </div>
      {isModalVisible && <ModalComponent modalModel={modalModel} onClose={() => setIsModalVisible(false)} />}
    </div>
  );
}
