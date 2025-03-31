import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoutes() {
  const isLogin = useSelector((state) => state.loginReducer);
  return <>{isLogin ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}</>;
}

export default PrivateRoutes;
