import React, { useEffect } from "react";
import axios from "axios";

const AuthMiddleware = ({ children }) => {
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    const tokenExpiration = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/auth/verify`,
          { token }
        );
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    tokenExpiration();
  }, [token]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
