import { useAuth } from "../../context/AuthContext";

export default function Post() {
  const { token } = useAuth();
  const { role } = useAuth();

  return (
    <div>
      {token}
      {role}
      <h3>Esta es la página de Post</h3>
    </div>
  );
}
