import { useAuth } from "../../context/AuthContext";

export default function Post() {
  const { token } = useAuth();

  return (
    <div>
      {token}
      <h3>Esta es la página de Post</h3>
    </div>
  );
}
