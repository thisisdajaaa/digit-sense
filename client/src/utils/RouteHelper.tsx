import { Navigate } from "react-router-dom";
import { isLoggedIn } from "./CommonHelper";

type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};
