import { ExpressError } from "../../../server/ExpressError/ExpressError";
import { searchContext } from "../context/context";
import { useContext } from "react";

export const useSearchContext = () => {
  const contextData = useContext(searchContext);
  if (contextData === undefined) {
    return new ExpressError("No data", 404);
  }
  return contextData;
};
