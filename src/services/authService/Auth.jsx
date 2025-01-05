import { useEffect } from "react";
import { useAuthContext } from "../../services/context/AuthContext";
import { apiGetRole } from "../apiService/Api";
import { useIsLoadingContext } from "../context/IsLoadingContext";

export default function Auth() {
  const { setToken, setRole, apiGetUserData: apiGetUserData } = useAuthContext();
  const { setIsLoading } = useIsLoadingContext();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      const userData = apiGetUserData().then((user) => {
        if (user && user.apiToken) {
          setToken(user.apiToken);
          console.log("api", userData);
        }
      });
    } else {
      const userId = localStorage.getItem("userId");
      const role = localStorage.getItem("role");
      if (!role) {
        const roleData = apiGetRole(token, userId).then((data) => {
          if (data.roleData.role) {
            setRole(data.roleData.role);
            console.log(roleData);
          }
        });
      } else {
        setRole(role);
      }
    }
    setIsLoading(false);
  }, [setToken, setRole, apiGetUserData, setIsLoading]);

  return null;
}
