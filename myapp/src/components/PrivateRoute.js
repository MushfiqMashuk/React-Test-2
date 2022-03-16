import { Navigate } from "react-router-dom";

function PrivateRoute({ component: Component }) {
  const userToken = document.cookie.split("=")[1];
  return <>{userToken ? <Component /> : <Navigate to="/" />}</>;
}

export default PrivateRoute;
