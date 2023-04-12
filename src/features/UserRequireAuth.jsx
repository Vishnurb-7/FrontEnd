import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData2 } from "./userAuthSlice";


const UserRequireAuth = () => {

  const user2 = useSelector(userData2)

  const location = useLocation();

  return user2 != "" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default UserRequireAuth;