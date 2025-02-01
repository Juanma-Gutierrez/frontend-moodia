import { useEffect } from "react";
import { useAuthContext } from "@services/context/AuthContext";
import { useEnvironmentContext } from "@services/context/EnvironmentContext";

export default function Auth() {
  const { setUser, setExtendedUser, setToken } = useAuthContext();
  const { setIsLoading } = useEnvironmentContext();

  useEffect(() => {
    setIsLoading(false);
  }, [setUser, setExtendedUser, setToken]);

  return null;
}
