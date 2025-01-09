import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEffect } from "react";
import { useEnvironmentContext } from "../../services/context/EnvironmentContext";

export default function Post() {
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>

      <h3>Esta es la página de Post</h3>
    </div>
  );
}
