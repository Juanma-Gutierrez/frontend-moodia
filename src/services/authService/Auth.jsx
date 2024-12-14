import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Auth() {
  const { setToken, getTokenFromApi } = useAuth();


  useEffect(() => {
    getTokenFromApi().then((apiToken) => {
      if (apiToken) {
        setToken(apiToken);
      }
    });
  }, [getTokenFromApi, setToken]);

  return null;
}
