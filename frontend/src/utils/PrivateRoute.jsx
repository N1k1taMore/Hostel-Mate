import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { useAuth } from "./Auth";

const PrivateRoute = () => {
  const { authToken, headers } = useAuth();

  console.log(authToken, headers);

  return authToken ? (
    <>
      <Dashboard />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
