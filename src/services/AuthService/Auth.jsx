import { useAuthContext } from "@services/Context/AuthContext";
import { useEffect } from "react";
import { useEnvironmentContext } from "@services/Context/EnvironmentContext";

/**
 * Auth component that handles user authentication logic.
 *
 * This component is responsible for setting the user, extended user, and token
 * in the context when the authentication process is complete. It also updates
 * the loading state to false once the authentication has been initialized.
 *
 * It uses `useEffect` to trigger side effects after the component is mounted.
 *
 * @returns {null} - This component does not render anything to the DOM.
 */
export default function Auth() {
  const { setUser, setExtendedUser, setToken } = useAuthContext();
  const { setIsLoading } = useEnvironmentContext();

  useEffect(() => {
    setIsLoading(false);
  }, [setUser, setExtendedUser, setToken]);

  return null;
}
