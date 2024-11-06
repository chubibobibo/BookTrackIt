import { toast } from "react-toastify";
import { useLoggedUserHook } from "../hooks/useLoggedUserHook";
import { Navigate } from "react-router-dom";

function ProtectRoutes({ children }) {
  /** @data user data from context in HomeLayout */
  const data = useLoggedUserHook();
  const userData = data?.data?.foundUser;
  if (!userData) {
    toast.error("Unauthorized");
  }
  return <>{userData ? children : <Navigate to='/' />}</>;
}
export default ProtectRoutes;
