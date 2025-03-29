import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const isLogin = true;
  return <>{isLogin ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>}</>;
}

export default PrivateRoutes;
