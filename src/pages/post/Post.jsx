import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Post() {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      {token}
      <h3>Esta es la página de Post</h3>
    </div>
  );
}
