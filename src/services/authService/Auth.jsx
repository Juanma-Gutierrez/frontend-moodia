import { useEffect } from "react";
import { useAuthContext } from "../../services/context/AuthContext";
import { useIsLoadingContext } from "../context/IsLoadingContext";

export default function Auth() {
  const { setUser, setExtendedUser, setToken } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoading(false);
  }, [setUser, setExtendedUser, setToken]);

  return null;
}
