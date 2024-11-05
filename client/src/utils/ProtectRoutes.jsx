import { useLoggedUserHook } from "../hooks/useLoggedUserHook";
import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  const data = useLoggedUserHook();
  const userData = data?.data?.foundUser;
  return <>{userData ? { children } : <Navigate to='/' />}</>;
}
export default ProtectRoutes;
