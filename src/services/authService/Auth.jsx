import { useEffect } from "react";
import { useAuthContext } from "../../services/context/AuthContext";
import { useEnvironmentContext } from "../context/EnvironmentContext";

export default function Auth() {
  const { setUser, setExtendedUser, setToken } = useAuthContext();
  const { setIsLoading } = useEnvironmentContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(false);
  }, [setUser, setExtendedUser, setToken]);

  return null;
}
