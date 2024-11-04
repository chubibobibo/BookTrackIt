import { useContext } from "react";
import { loggedUserContext } from "../context/context";
import { ExpressError } from "../../../server/ExpressError/ExpressError.js";

export const useLoggedUserHook = () => {
  const userData = useContext(loggedUserContext);
  if (userData === undefined) {
    throw new ExpressError("user data is not available", 404);
  }
  return userData;
};
