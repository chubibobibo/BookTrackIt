import Navbar from "../../components/Navbar";
import { toast } from "react-toastify";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

import { loggedUserContext } from "../../context/context.js";

/** loader function to obtain logged user */
export const loader = async () => {
  try {
    const userData = await axios.get("/api/auth/getLoggedUser");
    return userData;
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message);
    return err;
  }
};

function DashboardPage() {
  const userData = useLoaderData();

  return (
    <loggedUserContext.Provider value={userData}>
      <Navbar />
      Dashboard
    </loggedUserContext.Provider>
  );
}
export default DashboardPage;
