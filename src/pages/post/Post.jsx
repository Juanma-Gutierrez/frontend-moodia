import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";
import { Chip } from "../../components/chipComponent/chipComponent";

export default function Post() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const { category } = useEnvironmentContext();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h3>Esta es la página de Post</h3>
      <p>
        {Array.isArray(category) &&
          category.map((cat, index) => {
            return <Chip key={index} text={cat.name} />;
          })}
      </p>
    </div>
  );
}
