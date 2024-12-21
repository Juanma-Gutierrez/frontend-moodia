import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Auth() {
  const { setToken, getTokenFromApi } = useAuth();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      getTokenFromApi().then((apiToken) => {
        if (apiToken) {
          setToken(apiToken);
        }
      });
    }
  }, [getTokenFromApi, setToken]);

  return null;
}
