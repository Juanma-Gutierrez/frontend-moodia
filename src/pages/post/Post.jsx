import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { NewPostComponent } from "../../components/NewPostComponent/NewPostComponent";
import { PostComponent } from "../../components/PostComponent/PostComponent";

export default function Post() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const post = [
    {
      title: "Titulo 1",
      entry: "Entrada 1",
    },
    {
      title: "Titulo 2",
      entry: "Entrada 2",
    },
    {
      title: "Titulo 3",
      entry: "Entrada 3",
    },
    {
      title: "Titulo 4",
      entry: "Entrada 4",
    },
  ];

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <NewPostComponent />
      {Array.isArray(post) &&
        post.map(
          (p, index) => {
            return <PostComponent key={index} title={p.title} entry={p.entry} />;
          },
          [post]
        )}
    </div>
  );
}
