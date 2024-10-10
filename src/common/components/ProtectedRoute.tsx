import { Navigate, Outlet } from "react-router-dom";
import { pageRoutes } from "../../routes.ts";
import { useEffect, useState } from "react";
import checkAuth from "../api/checkAuth.ts";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    checkAuth().then((isAuthenticated) => {
      setIsAuthenticated(isAuthenticated);
    });
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={pageRoutes.login} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
