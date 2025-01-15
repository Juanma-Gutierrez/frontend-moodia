import "./Post.scss";
import { ApiRequest } from "../../services/apiService/RequestModel";
import { apiRequest } from "../../services/apiService/Api";
import { HttpMethod } from "../../services/apiService/RequestModel";
import { NewPostComponent } from "../../components/NewPostComponent/NewPostComponent";
import { PostComponent } from "../../components/PostComponent/PostComponent";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../services/extensions/Extensions";

export default function Post() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const getPostList = (token) => {
    const request = new ApiRequest("/post/list", HttpMethod.GET, "", token);
    apiRequest(request).then((response) => {
      if (response.success) {
        setPosts(response.data);
      } else {
        console.error(response.error);
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

  return (
    <div className="post-container">
      <div className="post">
        <NewPostComponent />
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
                />
              );
            },
            [posts]
          )}
      </div>
    </div>
  );
}
